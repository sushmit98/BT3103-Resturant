import { Line } from "vue-chartjs";
import axios from "axios";

export default {
  extends: Line,
  data: function() {
    return {
      results: [],
      datacollection: {
        labels: [],
        datasets: [
          {
            data: [],
            label: "west",
            borderColor: "#3e95cd",
            fill: false,
          },
          {
            data: [],
            label: "east",
            borderColor: "#8e5ea2",
            fill: false,
          },
          {
            data: [],
            label: "central",
            borderColor: "#3cba9f",
            fill: false,
          },
          {
            data: [],
            label: "south",
            borderColor: "#e8c3b9",
            fill: false,
          },
          {
            data: [],
            label: "north",
            borderColor: "#c45850",
            fill: false,
          },
          {
            data: [],
            label: "national",
            borderColor: "#2c3e50",
            fill: false,
          },
        ],
      },
      options: {
        legend: { display: true },
        title: {
          display: true,
          text: "PSI Twenty Four Hourly (By Region)",
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  methods: {
    fetchItems: function() {
      axios
        .get(`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`)
        .then((response) => {
          this.results = response.data;
          var items = this.results.items;
          for (let i = 0; i < items.length; i++) {
            this.datacollection.labels.push(items[i].timestamp);
            this.datacollection.datasets[0].data.push(
              items[i].readings["psi_twenty_four_hourly"]["west"]
            );
            this.datacollection.datasets[1].data.push(
              items[i].readings["psi_twenty_four_hourly"]["east"]
            );
            this.datacollection.datasets[2].data.push(
              items[i].readings["psi_twenty_four_hourly"]["central"]
            );
            this.datacollection.datasets[3].data.push(
              items[i].readings["psi_twenty_four_hourly"]["south"]
            );
            this.datacollection.datasets[4].data.push(
              items[i].readings["psi_twenty_four_hourly"]["north"]
            );
            this.datacollection.datasets[5].data.push(
              items[i].readings["psi_twenty_four_hourly"]["national"]
            );
          }
          this.renderChart(this.datacollection, this.options);
        });
    },
  },
  created() {
    this.fetchItems();
  },
};
