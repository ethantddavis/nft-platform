import { expect } from 'chai'
import { tokens, ether, ETHER_ADDRESS, EVM_REVERT, wait } from './helpers'

const ArtistPiece = artifacts.require('../contracts/ArtistPiece.sol')
const Bunny = require('../../src/uris/Bunny.json')
const fs = require('fs')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('ArtistPiece', ([deployer, user]) => {
  let artistpiece

  beforeEach(async () => {
    artistpiece = await ArtistPiece.new("Max Brown", "Gimmie the Loot", "LOOT")
  })

  describe('testing piece contract creation...', () => {
    
    it('checking collection name', async () => {
      expect(await artistpiece.name()).to.be.eq('Gimmie the Loot')
    })
    it('checking collection symbol', async () => {
      expect(await artistpiece.symbol()).to.be.eq('LOOT')
    })
    it('checking collection authors', async () => {
      expect(await artistpiece.authors()).to.be.eq('Max Brown')
    })
  })

  describe('testing mint...', () => {
    let collectableId
    
    beforeEach(async () => {
      //fs.readFile(Bunny, 'utf8', (err, bunny) => {
        //if (err) {
          //console.log("File read failed:", err)
          //return
        //}
      //})
      collectableId = await artistpiece.mint.call(1, JSON.stringify(Bunny))
      await artistpiece.mint(1, JSON.stringify(Bunny))
    })
    it('checking collectable id', async () => {
      expect(Number(collectableId)).to.be.eq(1)
    })
    it('checking uri contents', async () => {
      const metadata = JSON.parse(await artistpiece.tokenURI(collectableId))
      expect(metadata['name']).to.be.eq('Bunny')
      expect(metadata['description']).to.be.eq('Black and white bunny image')
      expect(metadata['image']).to.be.eq('ipfs://QmcvYjRGf7y6RMrPECwRsxnfsaxf1ufjr8YwtyPHxE4Bvg')
    })
  })
})

