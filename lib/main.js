import ProximitySearch from "@diasfs/proximity-search"
import HaversineGeolocation from 'haversine-geolocation';

import L from "leaflet"
//import("leaflet/dist/leaflet.css").then(e => { })
import "leaflet/dist/leaflet.css"

import iconUrl from '../public/img/pin.svg';
import iconShadowUrl from 'leaflet/dist/images/marker-shadow.png';


let I18n = {
    "amenity:arts_centre": "Centro Artístico",
    "aeroway:aerodrome": "Aeroporto",
    "amenity:atm": "Caixa Eletrônico",
    "amenity:bank": "Banco",
    "amenity:bar": "Bar",
    "amenity:bus_station": "Estação de Ônibus",
    "amenity:cafe": 'Café',
    "amenity:car_wash": "Lavagem de Carro",
    "amenity:grave_yard": "Cemitério",
    "amenity:pharmacy": "Farmácia",
    "amenity:hospital": "Hospital",
    "amenity:library": "Biblioteca",
    "amenity:post_depot": "Depósito",
    "amenity:nightclub": "Clube Noturno",
    "amenity:parking": "Estacionamento",
    "amenity:police": "Polícia",
    "amenity:post_office": "Correios",
    "amenity:school": "Escola",
    "amenity:childcare": "Creche",
    "amenity:university": "Universidade",
    "amenity:restaurant": "Restaurante",
    "amenity:fuel": "Posto de Combustível",
    "craft:bakery": "Padaria",
    "shop:beauty": "Salão de Beleza",
    "shop:books": "Livraria",
    "shop:convenience": "Loja de Conveniência",
    "shop:chemist": "Farmácia",
    "shop:pet": "Pet Shop",
    "shop:mall": "Mercado",
    "shop:supermarket": "Supermercado",
    "landuse:cemetery": "Cemitério",
    "building:church": "Igreja",
    "building:stadium": "Estádio",
    "leisure:fitness_centre": "Academia",
    "leisure:sports_centre": "Centro Esportivo",
    "leisure:park": "Parque",
    "leisure:stadium": "Estádio",
    "tourism:museum": "Museu",
    "tourism:attraction": "Atração Turística",
    "public_transport:station": "Transporte Público"
};

let default_config = {
    i18n: I18n,
    selector: '.points-of-interest',
    icon_url: iconUrl,
    icon_shadow_url: iconShadowUrl,
    precision: 6,
    neighbors: true
}

export const PointsOfInterestMap = async function (config = {}) {
    let {
        i18n,
        selector,
        icon_url,
        icon_shadow_url,
        precision,
        neighbors
    } = { ...default_config, ...config }
    if (document.querySelector(selector)) {
        let $el = document.querySelector(selector)
        let { lat, lng } = $el.dataset
        let latitude = +lat
        let longitude = +lng
        let pois = await ProximitySearch({ latitude, longitude }, { precision, neighbors })

        
        pois = pois.map(poi => {
            let tags = poi.tags.split(',').filter(tag => {
                if (!/^(amenity|shop|tourism|public_transportation|leisure|craft|building|aeroway|landuse)\:/.test(tag)) {
                    return false;
                }
                if (i18n && !i18n[tag]) {
                    return false;
                }
                return true;
            }).map(tag => {

                return {
                    tag,
                    title: i18n[tag]
                }
            })
            tags.sort()

            let distance = HaversineGeolocation.getDistanceBetween({
                latitude: poi.lat,
                longitude: poi.lng
            }, { latitude, longitude }, 'm')

            return {
                ...poi,
                tags,
                distance
            }
        })


        let $map = $el.querySelector('.map');
        var map = L.map($map).setView([latitude, longitude], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: ''
        }).addTo(map)

        let icon = L.icon({
            iconUrl: icon_url,
            shadowUrl: icon_shadow_url
        })

        let marker = L.marker([latitude, longitude], {
            icon
        })
            .addTo(map)


        let $ul = $el.querySelector('ul');
        $ul.innerHTML = '';

        let allCategories = pois.reduce((acc, { tags }) => ([...acc, ...tags]), []);
        let categories = [...new Set(allCategories.map(({ tag }) => tag))].map(tag => allCategories.find(cat => cat.tag == tag));
        categories.sort((a, b) => a.title < b.title ? -1 : 1)

        let Markers = {};
        for (let category of categories) {
            $($ul).append(`<li class="me-2" data-tag="${category.tag}"><a href="javascript:void(0)">${category.title}</a></li>`);
            let markers = pois.filter(poi => {
                let tags = poi.tags.map(({ tag }) => tag);
                return tags.includes(category.tag)
            }).map(({ name, distance, lat: latitude, lng: longitude }) => {

                return L.marker([latitude, longitude], {
                    icon,
                    title: `${name} à ${distance}m`
                })
            });
            Markers[category.tag] = markers
        }



        $($el).on('click', 'ul li', function () {
            let $li = $(this);
            let tag = $li.data('tag');
            let markers = Markers[tag];
            if ($li.is('.active')) {
                $li.removeClass('active')
                for (let marker of markers) {
                    marker.remove()
                }
            } else {
                $li.addClass('active')
                for (let marker of markers) {
                    marker.addTo(map)
                }
            }
        });
    }
}

export default PointsOfInterestMap

window.PointsOfInterestMap = PointsOfInterestMap