// Mapa.jsx

import React, { useEffect } from "react";
import styles from "./Mapa.module.css";

// Função para carregar o script da API do Google Maps de forma assíncrona
const loadGoogleMapsScript = (callback) => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBiIQVJzDCjwCila1MkL21K28vKtC8JQjI&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = callback;
    document.head.appendChild(script);
};

const Mapa = ({ latitude, longitude }) => {
    // Carrega o script da API do Google Maps e, quando carregado, renderiza o mapa
    useEffect(() => {
        loadGoogleMapsScript(() => renderizarMapa(latitude, longitude));
    }, [latitude, longitude]);

    // Função para renderizar o mapa com as coordenadas fornecidas
    const renderizarMapa = (latitude, longitude) => {
        const mapOptions = {
            center: { lat: latitude, lng: longitude },
            zoom: 15,
        };

        // Renderiza o mapa na div com id "map"
        const map = new window.google.maps.Map(document.getElementById("map"), mapOptions);

        // Adiciona um marcador no mapa
        new window.google.maps.Marker({
            position: { lat: latitude, lng: longitude },
            map: map,
            title: "Local da Barbearia",
        });
    };

    return <div className={styles.mapa} id="map"></div>;
};

export default Mapa;
