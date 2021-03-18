import { Bar } from "vue-chartjs";
import database from "../../firebase.js";

export default {
  extends: Bar,
  data: () => ({
    datacollection: {
      labels: [],
      datasets: [
        {
          label: "Total orders",
          backgroundColor: [
            "#3e95cd",
            "#8e5ea2",
            "#3cba9f",
            "#e8c3b9",
            "#c45850",
            "#2c3e50",
          ],
          data: [],
        },
      ],
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: "Total orders per dish",
      },
      scales: {
        yAxes: [
          {
            ticks: {
              min: 0,
            },
          },
        ],
      },
      responsive: true,
      maintainAspectRatio: false,
    },
  }),
  methods: {
    fetchItems: function() {
      var ords = database.collection("orders").get();
      ords.then((snapShot) => {
        var counts = [];
        snapShot.docs.forEach((doc) => {
          for (const key in doc.data()) {
            var dName = doc.data()[key].name;
            var dCount = doc.data()[key].count;

            if (!this.datacollection.labels.includes(dName)) {
              this.datacollection.labels.push(dName);
              counts.push(dCount);
            } else {
              var ind = this.datacollection.labels.indexOf(dName);
              var currentCount = this.datacollection.datasets[0].data[ind];
              var newCount = dCount + currentCount;
              counts.splice(ind, 1, newCount);
            }
          }
          this.datacollection.datasets[0].data = counts;
          this.renderChart(this.datacollection, this.options);
        });
      });
    },
  },
  created() {
    this.fetchItems();
  },
};
