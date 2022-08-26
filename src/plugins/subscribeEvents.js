const fp = require('fastify-plugin')
const ethers = require('ethers')
const fs = require('fs')

async function subscribeEvent(fastify, options) {
  const provider = new ethers.providers.JsonRpcProvider(process.env.JSON_RPC)

  console.log('****** Contract events ******')

  // Auction contract
  const auctionAbiJson = fs.readFileSync('abi/auction_abi.json')
  const auctionAbi = JSON.parse(auctionAbiJson)
  let auctionContractAddress = process.env.AUCTION_CONTRACT_ADDRESS

  const auctionContract = new ethers.Contract(
    auctionContractAddress,
    auctionAbi,
    provider
  )

  // Create auction
  auctionContract.on(
    'MakeOrder',
    async (id, hash, seller, startPrice, endTime) => {
      try {
        console.log(
          'MakeOrder event data',
          `id: ${id}`,
          `hash: ${hash}`,
          `seller: ${seller}`,
          `startPrice: ${startPrice}`,
          `endTime: ${endTime}`
        )
      } catch (error) {
        console.log(error)
      }
    }
  )

  // Cancel auction
  auctionContract.on('CancelOrder', async (id, hash, seller) => {
    try {
      console.log(
        'CancelOrder event data',
        `id: ${id}`,
        `hash: ${hash}`,
        `seller: ${seller}`
      )
    } catch (error) {
      console.log(error)
    }
  })

  // Create bid
  auctionContract.on('Bid', async (id, hash, bidder, bidPrice) => {
    try {
      console.log(
        'Bid event data',
        `id: ${id}`,
        `hash: ${hash}`,
        `bidder: ${bidder}`,
        `bidPrice: ${bidPrice}`,
      )
    } catch (error) {
      console.log(error)
    }
  })

  // Claim event
  auctionContract.on('Claim', async (id, hash, seller, taker, price) => {
    try {
      console.log(
        'Claim event data',
        `id: ${id}`,
        `hash: ${hash}`,
        `seller: ${seller}`,
        `taker: ${taker}`,
        `price: ${price}`
      )
    } catch (error) {
      console.log(error)
    }
  })

  // NFT contract
  const nftAbiJson = fs.readFileSync('abi/nft_abi.json')
  const nftAbi = JSON.parse(nftAbiJson)

  const nftContract = new ethers.Contract(
    process.env.NFT_CONTRACT_ADDRESS,
    nftAbi,
    provider
  )


  //Mint event
  nftContract.on('Mint', async (tokenId, owner, weight, nftType) => {
    try {
      console.log(
        'Mint event data',
        `tokenId: ${tokenId}`,
        `owner: ${owner}`,
        `weight: ${weight}`,
        `nftType: ${nftType}`,
      )
    } catch (error) {
      console.log(error)
    }
  })

  // Transfer event
  nftContract.on('Transfer', async (from, to, tokenId) => {
    try {
      console.log(
        'Transfer event data',
        `from: ${from}`,
        `to: ${to}`,
        `tokenId: ${tokenId}`,
      )
    } catch (error) {
      console.log(error)
    }
  })

  // Burn event
  nftContract.on('Burn', async tokenId => {
    try {
      console.log(
        'Burn event data',
        `tokenId: ${tokenId}`
      )
    } catch (error) {
      console.log(error)
    }
  })

  // Marketplace contract
  const marketPlaceAbiJson = fs.readFileSync('abi/marketplace_abi.json')
  const marketPlaceAbi = JSON.parse(marketPlaceAbiJson)

  const marketPlaceContract = new ethers.Contract(
    process.env.MARKETPLACE_CONTRACT_ADDRESS,
    marketPlaceAbi,
    provider
  )

  // Add to sale event
  marketPlaceContract.on('Ask', async (seller, tokenId, price) => {
    try {
      console.log(
        'Ask event data',
        `seller: ${seller}`,
        `tokenId: ${tokenId}`,
        `price: ${price}`
      )
    } catch (error) {
      console.log(error)
    }
  })

  // Cancel sale
  marketPlaceContract.on('CancelSellToken', async (seller, tokenId) => {
    try {
      console.log(
        'CancelSellToken event data',
        `seller: ${seller}`,
        `tokenId: ${tokenId}`,
      )
    } catch (error) {
      console.log(error)
    }
  })

  // Buy token event
  marketPlaceContract.on('Trade', async (seller, buyer, tokenId, price) => {
    try {
        console.log(
          'Trade event data',
          `seller: ${seller}`,
          `buyer: ${buyer}`,
          `tokenId: ${tokenId}`,
          `price: ${price}`,
        )
    } catch (error) {
      console.log(error)
    }
  })

  // Cutting contract
  const cuttingAbiJson = fs.readFileSync('abi/cutting_abi.json')
  const cuttingAbi = JSON.parse(cuttingAbiJson)

  const cuttingContract = new ethers.Contract(
    process.env.CUTTING_CONTRACT_ADDRESS,
    cuttingAbi,
    provider
  )

  cuttingContract.on('Cut', async tokenId => {
    try {
      console.log(
        'Cut event data',
        `tokenId: ${tokenId}`,
      )
    } catch (error) {
      console.log(error)
    }
  })

  cuttingContract.on('CutWithFee', async (tokenId, feeTokenId) => {
    try {
      console.log(
        'CutWithFee event data',
        `tokenId: ${tokenId}`,
        `feeTokenId: ${feeTokenId}`
      )
    } catch (error) {
      console.log(error)
    }
  })
}
module.exports = fp(subscribeEvent)
