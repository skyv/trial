( function ( $ ) {
    "use strict";

    var customerActivityResponseData = {};
    var campaignResultResponseData = {};
    $.ajax({url: "http://hackathon-env.23kccc2pvp.ap-south-1.elasticbeanstalk.com/useractivity", success: function(result){
        console.log(result.data);
        customerActivityResponseData = result.data;
        let chartData = [];
        chartData.push(result.data.activeUserCount);
        chartData.push(result.data.inactiveUserCount);
        drawPieChart(chartData);
        drawDoughnutChart(result.data.inactiveArray);
        
    }});

    /*$.ajax({url: "http://hackathon-env.23kccc2pvp.ap-south-1.elasticbeanstalk.com/getloyalityDetails", success: function(result){
        console.log(result.data);
        $('#loyalCustomerCount').html(result.data.count);
    }});*/

    $.ajax({url: "http://hackathon-env.23kccc2pvp.ap-south-1.elasticbeanstalk.com/getcampaigndetails", success: function(result){
        console.log(result.data);
        campaignResultResponseData = result.data;
        let chartData = [];
        chartData.push(result.data.successfullCampaign.count);
        chartData.push(result.data.failedCampaigned.count);
        drawPieChartForCampaignResults(chartData);
    }});
    
    $('.singel-bar-chart-wrapper').hide();
    $('#campaign_section').hide();

    drawLineChart();

    function drawPieChartForCampaignResults(input) {
        if(input.length>0) {
            //pie chart
            var ctx = document.getElementById( "pieChartForCampaignResult" );
            ctx.height = 150;
            var myChart = new Chart( ctx, {
                type: 'pie',
                data: {
                    datasets: [ {
                        data: input,
                        backgroundColor: [
                            "rgba(36, 168, 216,0.9)",
                            "rgba(0,0,0,0.07)"
                                        ],
                        hoverBackgroundColor: [
                            "rgba(36, 168, 216,0.7)",
                            "rgba(0,0,0,0.07)"
                                        ]

                                    } ],
                    labels: [
                                    "Success",
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
                            "rgba(36, 168, 216,0.9)",
                            "rgba(0,0,0,0.07)"
                                        ],
                        hoverBackgroundColor: [
                            "rgba(36, 168, 216,0.9)",
                            "rgba(0,0,0,0.07)"
                                        ]

                                    } ],
                    labels: [
                                    "Active",
                                    "Inactive"
                                ]
                },
                options: {
                    responsive: true
                }
            } );
            // ctx.onclick = function(evt) {
            //     var activePoints = myChart.getElementsAtEvent(evt);
            //     if (activePoints[0]) {
            //     var chartData = activePoints[0]['_chart'].config.data;
            //     var idx = activePoints[0]['_index'];
        
            //     var label = chartData.labels[idx];
            //     var value = chartData.datasets[0].data[idx];
            //     var color = chartData.datasets[0].backgroundColor[idx]; //Or any other data you wish to take from the clicked slice
                
            //     // drawDrillDownChart(label, 'campaignDetails');
            //     showCampaignSection(label);
            //     // alert(label + ' ' + value + ' ' + color); //Or any other function you want to execute. I sent the data to the server, and used the response i got from the server to create a new chart in a Bootstrap modal.
            //     }
            // };
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
                            "rgba(36, 168, 216, 0.9)",
                            // "rgba(0, 123, 255,0.7)",
                            "rgba(36, 168, 216, 0.6)",
                            "rgba(0,0,0,0.07)"
                                        ],
                        hoverBackgroundColor: [
                            "rgba(36, 168, 216, 0.7)",
                            // "rgba(0, 123, 255,0.7)",
                            "rgba(36, 168, 216, 0.4)",
                            "rgba(0,0,0,0.07)"
                                        ]
    
                                    } ],
                    labels: [
                                    "Idle",
                                    "Dormant",
                                    "Inactive"
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
                
                // drawDrillDownChart(label, 'campaignDetails');
                showCampaignSection(label);
                // alert(label + ' ' + value + ' ' + color); //Or any other function you want to execute. I sent the data to the server, and used the response i got from the server to create a new chart in a Bootstrap modal.
                }
            };
        }
    }

    function showCampaignSection(label) {
        $('#campaign_section').show(); 
        $('.campaign_list_active, .campaign_list_fairly_active, .campaign_list_inactive').hide();

        switch(label) {
            case 'Idle' : $('.campaign_list_active').show();
            break;
            case 'Dormant' :  $('.campaign_list_fairly_active').show();
            break;
            case 'Inactive' :  $('.campaign_list_inactive').show();
            break;
        }
    }
    
    function drawLineChart(input) {
        //Line chart
        var ctx = document.getElementById( "lineChart" );
        ctx.height = 150;
        var myChart = new Chart( ctx, {
            type: 'line',
            data: {
                labels: [ "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct" ],
                type: 'line',
                defaultFontFamily: 'Montserrat',
                datasets: [ {
                    label: "Messages sent",
                    data: [ 200, 150, 350, 200, 300, 550, 500 ],
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(36, 168, 216,0.9)',
                    borderWidth: 3,
                    pointStyle: 'circle',
                    pointRadius: 5,
                    pointBorderColor: 'transparent',
                    pointBackgroundColor: 'rgba(36, 168, 216,0.9)',
                        }, {
                            label: "Messages read",
                    data: [ 120, 80, 200, 130, 190, 385, 410 ],
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(36, 168, 216,0.5)',
                    borderWidth: 3,
                    pointStyle: 'circle',
                    pointRadius: 5,
                    pointBorderColor: 'transparent',
                    pointBackgroundColor: 'rgba(36, 168, 216,0.5)',
                        } ]
            },
            options: {
                responsive: true,

                tooltips: {
                    mode: 'index',
                    titleFontSize: 12,
                    titleFontColor: '#000',
                    bodyFontColor: '#000',
                    backgroundColor: '#fff',
                    titleFontFamily: 'Montserrat',
                    bodyFontFamily: 'Montserrat',
                    cornerRadius: 3,
                    intersect: false,
                },
                legend: {
                    display: false,
                    labels: {
                        usePointStyle: true,
                        fontFamily: 'Montserrat',
                    },
                },
                scales: {
                    xAxes: [ {
                        display: true,
                        gridLines: {
                            display: false,
                            drawBorder: false
                        },
                        scaleLabel: {
                            display: false,
                            labelString: 'Date'
                        }
                            } ],
                    yAxes: [ {
                        display: true,
                        gridLines: {
                            display: false,
                            drawBorder: false
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'No: of communications'
                        }
                            } ]
                },
                title: {
                    display: false,
                    text: 'Normal Legend'
                }
            }
        } );
    }

    function drawDrillDownChart(identifier, parentChart) {
        let labelText = (identifier == 'Success') ? 'Successful Campaign Details' : 'Failed Campaign Details';
        var ctx;
        let input = [];
        // $('#singelBarChartForSuccess, #singelBarChartForFailed').hide();
        if(identifier == 'Success') {
            input.push(campaignResultResponseData.successfullCampaign.split.email);
            input.push(campaignResultResponseData.successfullCampaign.split.webpush);
            input.push(campaignResultResponseData.successfullCampaign.split.whatsapp);
            // $('#singelBarChartForSuccess').show();
            // ctx = document.getElementById( "singelBarChartForSuccess" );
        } else if(identifier == 'Failed') {
            input.push(campaignResultResponseData.failedCampaigned.split.email);
            input.push(campaignResultResponseData.failedCampaigned.split.webpush);
            input.push(campaignResultResponseData.failedCampaigned.split.whatsapp);
            // $('#singelBarChartForFailed').show();
            // ctx = document.getElementById( "singelBarChartForFailed" );
        }
        // single bar chart
        $('.singel-bar-chart-wrapper').show();
        $("canvas#singelBarChart").remove();
        $("div#drillDownGraph").append('<canvas id="singelBarChart" class="animated fadeIn" height="150"></canvas>');
        var ctx = document.getElementById("singelBarChart").getContext("2d");
        // var ctx = document.getElementById( "singelBarChart" );
        ctx.height = 150;
        var myChart = new Chart( ctx, {
            type: 'bar',
            data: {
                labels: [ "Email", "Webpush", "WhatsApp" ],
                datasets: [
                    {
                        label:labelText,
                        data: input,
                        borderColor: "rgba(36, 168, 216,0.9)",
                        borderWidth: "0",
                        backgroundColor: "rgba(36, 168, 216,0.9)"
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

