( function ( $ ) {
    "use strict";

    var customerActivityResponseData = {};
    var campaignResultResponseData = {};
    $.ajax({url: "http://hackathon-env.23kccc2pvp.ap-south-1.elasticbeanstalk.com/useractivity", success: function(result){
        console.log(result.data);
        customerActivityResponseData = result.data;
        let chartData = [];
        chartData.push(result.data.activeUserCount);
        chartData.push(result.data.failyActiveUserCount);
        chartData.push(result.data.inactiveUserCount);
        drawDoughnutChart(chartData);
    }});

    $.ajax({url: "http://hackathon-env.23kccc2pvp.ap-south-1.elasticbeanstalk.com/getcampaigndetails", success: function(result){
        console.log(result.data);
        campaignResultResponseData = result.data;
        let chartData = [];
        chartData.push(result.data.successfullCampaign.count);
        chartData.push(result.data.failedCampaigned.count);
        drawPieChart(chartData);
    }});
    
    $('.singel-bar-chart-wrapper').hide();


    function drawPieChart(input) {
        if(input.length>0) {
            //pie chart
            var ctx = document.getElementById( "pieChart" );
            ctx.height = 150;
            var myChart = new Chart( ctx, {
                type: 'pie',
                data: {
                    datasets: [ {
                        data: input,
                        backgroundColor: [
                                            "rgba(0, 176, 67, 0.5)",
                                            "rgba(240, 45, 76, 0.7)"
                                        ],
                        hoverBackgroundColor: [
                                            "rgba(0, 176, 67, 0.3)",
                                            "rgba(240, 45, 76, 0.3)"
                                        ]

                                    } ],
                    labels: [
                                    "Successful",
                                    "Failed"
                                ]
                },
                options: {
                    responsive: true
                }
            } );
            ctx.onclick = function(evt) {
                var activePoints = myChart.getElementsAtEvent(evt);
                if (activePoints[0]) {
                var chartData = activePoints[0]['_chart'].config.data;
                var idx = activePoints[0]['_index'];
        
                var label = chartData.labels[idx];
                var value = chartData.datasets[0].data[idx];
                var color = chartData.datasets[0].backgroundColor[idx]; //Or any other data you wish to take from the clicked slice
                
                drawDrillDownChart(label, 'campaignDetails');
                // alert(label + ' ' + value + ' ' + color); //Or any other function you want to execute. I sent the data to the server, and used the response i got from the server to create a new chart in a Bootstrap modal.
                }
            };
        }
    }

    function drawDoughnutChart(input) {
        //doughut chart
        if(input.length>0) {
            var ctx = document.getElementById( "doughutChart" );
            ctx.height = 150;
            var myChart = new Chart( ctx, {
                type: 'doughnut',
                data: {
                    datasets: [ {
                        data: input,
                        backgroundColor: [
                                            "rgba(0, 176, 67, 0.5)",
                                            "rgba(242, 113, 115, 0.6)",
                                            "rgba(240, 45, 76, 0.7)"
                                        ],
                        hoverBackgroundColor: [
                                            "rgba(0, 176, 67, 0.3)",
                                            "rgba(242, 113, 115, 0.5)",
                                            "rgba(240, 45, 76, 0.3)"
                                        ]
    
                                    } ],
                    labels: [
                                    "Active",
                                    "Fairly Active",
                                    "Inactive"
                                ]
                },
                options: {
                    responsive: true
                }
            } );
        }
    }

    function drawDrillDownChart(identifier, parentChart) {
        let labelText = (identifier == 'Successful') ? 'Successful Campaign Details' : 'Failed Campaign Details';
        
        let input = [];
        if(identifier == 'Successful') {
            input.push(campaignResultResponseData.successfullCampaign.split.email);
            input.push(campaignResultResponseData.successfullCampaign.split.webpush);
            input.push(campaignResultResponseData.successfullCampaign.split.whatsapp);
        } else if(identifier == 'Failed') {
            input.push(campaignResultResponseData.failedCampaigned.split.email);
            input.push(campaignResultResponseData.failedCampaigned.split.webpush);
            input.push(campaignResultResponseData.failedCampaigned.split.whatsapp);
        }
        // single bar chart
        $('.singel-bar-chart-wrapper').show();
        var ctx = document.getElementById( "singelBarChart" );
        ctx.height = 150;
        var myChart = new Chart( ctx, {
            type: 'bar',
            data: {
                labels: [ "Email", "Webpush", "WhatsApp" ],
                datasets: [
                    {
                        label:labelText,
                        data: input,
                        borderColor: "rgba(0, 176, 67, 0.5)",
                        borderWidth: "0",
                        backgroundColor: "rgba(0, 123, 255, 0.5)"
                                }
                            ]
            },
            options: {
                scales: {
                    yAxes: [ {
                        ticks: {
                            beginAtZero: true
                        }
                                    } ]
                }
            }
        } );
    }

} )( jQuery );

