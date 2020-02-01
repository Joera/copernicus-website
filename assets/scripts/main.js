

window.addEventListener('load', function () {
    if (typeof web3 !== 'undefined') {
        console.log('Web3 Detected! ' + web3.currentProvider.constructor.name)
        myWeb3 = window.web3 = new Web3(web3.currentProvider);
        ethereum.enable()
        console.log(myWeb3.version.api);

        getContract(myWeb3);

    } else {
        console.log('No Web3 Detected... please install Metamask')
        document.getElementById("metamask_warning").hidden = false
    }
})

async function getSupply(contract) {

    contract.totalSupply.call(function (err, data) {
        if (err) {
            console.log(err)
        }
        if (data) {

            console.log(data.toNumber());
            return data;
        } else {
            return false;
        }
    });
}

function getTokenURI(contract,i) {

    return new Promise (function (resolve, reject) {

        contract.tokenURI.call(i, async function (error,data)  {

            if(error) {
                reject(error)
            } else {
                resolve(data);
            }
        })
    });
}

function getOwnerOf(contract,i) {

    return new Promise (function (resolve, reject) {

        contract.ownerOf.call(i, async function (error,data)  {

            if(error) {
                reject(error)
            } else {
                resolve(data);
            }
        })
    });
}

function mint(myWeb3,contract,i) {



    return new Promise (function (resolve, reject) {

        console.log(i);

        let j = 11;
        let tokenURIs = 'https://projectcopernicus.autonomous-times.com/assets/json/ticket_' + j + '.json';

        contract.mintUniqueTokenTo(myWeb3.eth.accounts[0], j,tokenURIs,{ from : myWeb3.eth.accounts[0], gas : 5000000 }, function(error,data) {

            if(error) {
                console.log(error);
                reject(error)
            } else {
                console.log(data);
                resolve(data);
            }

        });
            // .estimateGas()
            // .then(function (estimate) {
            //     console.log("Estimated gas to execute mint: ", estimate);
            //     resolve(estimate);
            // });
    });
}

async function getContract(myWeb3) {

    // let address = '0xc48cE47D564d7B09b40f0B1d15908FA8699B3896';
    let address = '0x62c1d656A64D82A69384E6bE97fB9c203CE8ac56';
    let abi = [ { "constant": true, "inputs": [ { "name": "_interfaceId", "type": "bytes4" } ], "name": "supportsInterface", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "name", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_tokenId", "type": "uint256" } ], "name": "getApproved", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_to", "type": "address" }, { "name": "_tokenId", "type": "uint256" } ], "name": "approve", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "InterfaceId_ERC165", "outputs": [ { "name": "", "type": "bytes4" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_tokenId", "type": "uint256" } ], "name": "transferFrom", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" }, { "name": "_index", "type": "uint256" } ], "name": "tokenOfOwnerByIndex", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_tokenId", "type": "uint256" } ], "name": "safeTransferFrom", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "_tokenId", "type": "uint256" } ], "name": "exists", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_index", "type": "uint256" } ], "name": "tokenByIndex", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_tokenId", "type": "uint256" } ], "name": "ownerOf", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" } ], "name": "balanceOf", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_to", "type": "address" }, { "name": "_approved", "type": "bool" } ], "name": "setApprovalForAll", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_tokenId", "type": "uint256" }, { "name": "_data", "type": "bytes" } ], "name": "safeTransferFrom", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "_tokenId", "type": "uint256" } ], "name": "tokenURI", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" }, { "name": "_operator", "type": "address" } ], "name": "isApprovedForAll", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [ { "name": "_name", "type": "string" }, { "name": "_symbol", "type": "string" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "_from", "type": "address" }, { "indexed": true, "name": "_to", "type": "address" }, { "indexed": true, "name": "_tokenId", "type": "uint256" } ], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "_owner", "type": "address" }, { "indexed": true, "name": "_approved", "type": "address" }, { "indexed": true, "name": "_tokenId", "type": "uint256" } ], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "_owner", "type": "address" }, { "indexed": true, "name": "_operator", "type": "address" }, { "indexed": false, "name": "_approved", "type": "bool" } ], "name": "ApprovalForAll", "type": "event" }, { "constant": false, "inputs": [ { "name": "_to", "type": "address" }, { "name": "_tokenId", "type": "uint256" }, { "name": "_tokenURI", "type": "string" } ], "name": "mintUniqueTokenTo", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" } ]

    // console.log(myWeb3)


    let contract = myWeb3.eth.contract(abi).at(address);

    console.log(contract);

    await contract.totalSupply.call( async function (err, data) {

        console.log('--');

        if (err) {
            console.log(err)
        }
        
        let supply = data.toNumber() || 0;
        let tokenList = [];
        let i;
        let el, el_grid;

        console.log('2');


        console.log(supply);

        let els = [].slice.call(document.querySelectorAll(".system a"));

        for (i = 1; i < parseInt(supply) + 1; i++) {

            let ob = {};

            ob.owner = await getOwnerOf(contract,i);

            ob.tokenURI = await getTokenURI(contract,i);

            el_grid = document.querySelector(".grid a:nth-of-type(" + i + ")");

            if(ob.owner && ob.owner !== undefined) {
                el_grid.classList.add('has_owner');
                els[i - 1].classList.add('has_owner');
                els[i - 1].querySelector('span.address').innerText = ob.owner;
            }

            els[i - 1].href = 'https://opensea.io/assets/' + address + '/' + i;
            el_grid.href = 'https://opensea.io/assets/' + address + '/' + i;

            // tokenList.push(ob);
        }

        for (i = parseInt(supply) + 1; i < els.length; i++) {

            els[i].addEventListener('click', async function(ev) {

                console.log(ev);

                let ret = await mint(myWeb3,contract,i);

            }, false);

        }

    });
}

function showcase(i) {

    if(i === 2) {
        document.querySelector('.showcase_wrapper').classList.add('grid_view');

    } else {
        document.querySelector('.showcase_wrapper').classList.remove('grid_view');
    }


}