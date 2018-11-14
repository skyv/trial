( function ( $ ) {
    "use strict";

    var customerActivityChartData = [];
    var campaignResultChartData = [];
    $.ajax({url: "http://hackathon-env.23kccc2pvp.ap-south-1.elasticbeanstalk.com/useractivity", success: function(result){
        console.log(result.data);
        customerActivityChartData.push(result.data.activeUserCount);
        customerActivityChartData.push(result.data.failyActiveUserCount);
        customerActivityChartData.push(result.data.inactiveUserCount);
        customerActivityChart();
    }});

    // $.ajax({url: "http://hackathon-env.23kccc2pvp.ap-south-1.elasticbeanstalk.com/campaignresult", success: function(result){
    //     console.log(result.data);
        
    //     campaignResultChart();
    // }});
    campaignResultChartData = [500, 200];
    campaignResultChart();
    

    function campaignResultChart() {
        //pie chart
        var ctx = document.getElementById( "pieChart" );
        ctx.height = 150;
        var myChart = new Chart( ctx, {
            type: 'pie',
            data: {
                datasets: [ {
                    data: campaignResultChartData,
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
                                "Unsuccessful"
                            ]
            },
            options: {
                responsive: true
            }
        } );
    }

    function customerActivityChart() {
        //doughut chart
        if(customerActivityChartData.length>0) {
            var ctx = document.getElementById( "doughutChart" );
            ctx.height = 150;
            var myChart = new Chart( ctx, {
                type: 'doughnut',
                data: {
                    datasets: [ {
                        data: customerActivityChartData,
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


} )( jQuery );

