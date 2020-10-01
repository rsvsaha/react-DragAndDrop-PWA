var config = {
    "id1": {
        "createVariable": {
            type: "BasicFunctions",
            arguments: ["variable1"],
        }
    },
    "id2": {
        "assignFunction": {
            type: "BasicFunctions",
            arguments: ["variable1", 5],

        }
    },
    "id3": {
        "printFunction": {
            type: "BasicFunctions",
            arguments: ["variable1"],
        }
    },
    "id4": {
        "createVariable": {
            type: "BasicFunctions",
            arguments: ["variable2"],
        }
    },
    "id5": {
        "assignFunction": {
            type: "BasicFunctions",
            arguments: ["variable2", 20],

        }
    },
    "id6": {
        "printFunction": {
            type: "BasicFunctions",
            arguments: ["variable2"],
        }
    },

    "id7": {
        "ifElseBlock": {
            type: "LogicBlocks",
            arguments: [
                {
                    "greaterThan":
                    {
                        type: "LogicalFunctions",
                        arguments: ["variable1", "variable2"]
                    }
                }, {
                    "executionBlock": {

                        type: "LogicBlocks",
                        arguments: require('./config2')
                    }

                }, {

                    "executionBlock": {

                        type: "LogicBlocks",
                        arguments: {
                            "id1": {
                                "printFunction": {
                                    type: "BasicFunctions",
                                    arguments: ["variable2"],
                                }
                            },
                            "id2": {
                                "printFunction": {
                                    type: "BasicFunctions",
                                    arguments: ["variable1"],
                                }
                            },


                        }

                    }

                }

            ]

        }
    },
    "id8" : {
        "createVariable": {
            type: "BasicFunctions",
            arguments: ["variable3"],
        }
    },
    "id9": {
        "assignFunction": {
            type: "BasicFunctions",
            arguments: ["variable3", 0],

        }
    },
    "id10": require('./foorLoopconfig')

}

module.exports = config;