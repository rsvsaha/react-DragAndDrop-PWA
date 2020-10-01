module.exports = {

    "forLoop": {
        type: "LoopBlocks",
        arguments: ["variable3","variable2",{
                "executionBlock": {

                    type: "LogicBlocks",
                    arguments: require('./config2')
                }
            }
        ],
    }

}