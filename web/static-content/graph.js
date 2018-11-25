function drawHistory(history, type){
    var temps = [];
    var dates = [];
    var labels = [];
    var colour;
    var yaxis;
    for (var i = 0; i <= history.length; i++){
        if (history[i] != null){
            temps.push(history[i][type]);
            d = new Date(history[i]['recordDate'])
            dates.push((d.toString()).substring(0,25));
        } 
    }
    
    if (type == "moisture"){
        var ctx = document.getElementById("myChart").getContext('2d');
        colour = 'rgba(255, 99, 132, 0.5)';
        yaxis = "Moisture (%) "
    } else if (type == "temp"){
        var ctx = document.getElementById("myChart1").getContext('2d');
        colour = 'rgba(75, 192, 192, 0.5)';
        yaxis = "Celsius (°C)"
    }
    else if (type == "humidity"){
        var ctx = document.getElementById("myChart2").getContext('2d');
        colour = 'rgba(153, 102, 255, 0.5)';
        yaxis = "Relative Humidity (%)"
    }
    
	var myChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: dates,
			datasets: [{
			    data: temps,
			    backgroundColor: colour,
			    borderWidth: 1
			}]
		},
		options: {
            legend: {
                display: false,
           
            },
            
            title: {
                display: true,
                text: type[0].toUpperCase() + type.slice(1)
            },
           
			scales: {
			    yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: yaxis
                      },
                    
			        ticks: {
			            beginAtZero:true
			        },
			    }],
			    xAxes: [{
                    
                    scaleLabel: {
                        display: true,
                        labelString: 'Date and Time'
                      },
                      
			        ticks: {
			            autoskip: true
			        },

			    }],
			}
		}
	});

}
