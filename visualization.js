
document.addEventListener("DOMContentLoaded", () => {

  // Definiere die Breite (width) und Höhe (height) deiner Visualisierung `800x600`
  const width = 800
  const height = 600

  // Hole den #viz container aus dem DOM mit `d3.select()`
  const container = d3.select("#viz")
    .attr("fill", "blue")


  // Erstelle eine SVG node mit den Dimensionen `800x600`
  const svg = container.append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("border", "1px solid #000")

  // Geografische Formen sind in `countries.features`

  d3.json("/countries.json")
    .then(countries => {


      // Konfiguriere eine Kartenprojektion
      const projection = d3.geoBonne()
        .rotate([-20.0, 0.0])
        .center([0.0, 52.0])
        .parallel(52)
        .translate([width / 2, height / 2])
        .scale(700)
        .precision(.1)

      // Erstelle einene Pfadgenerator mit `d3.geoPath()`
      const path = d3.geoPath().projection(projection)


      // Optional: Erstelle ein Gradnetz mit `d3.geoGraticule()()`

      // Binde `countries.features` an Pfade
      const laender = svg.selectAll("path")
        .data(countries.features)
        .enter()
        .append("path")
        .attr("d", d => path(d))


      // Städtedaten sind in `cities`

      d3.csv("/cities.csv")
        .then(cities => {

          // Binde `cities` an Kreise
          const cirlces = svg.selectAll('circle')
            .data(cities)
            .enter()
            .append('circle')
            .attr("cx", d => projection([d.lon, d.lat])[0])
            .attr("cy", d => projection([d.lon, d.lat])[1])
            .attr("r", d => d.size)
            .attr('fill', 'rgba(255, 100, 0, 0.5)');


          // ========================================

        })
    })

})
