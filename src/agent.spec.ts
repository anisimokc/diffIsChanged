import {
    createBlockEvent,
    HandleBlock
  } from "forta-agent"
  import agent from "./agent"
  
  describe("diffchanged agent", () => {
    let handleBlock: HandleBlock
  
    const createTxEventWithDiff = (diff: string) => createBlockEvent({
      block:{
          difficulty: diff,
          gasLimit :"",
          extraData:{} as any,
          gasUsed:"",
          hash:"",
          miner:"",
          logsBloom:"",
          mixHash:"",
          nonce:"",
          number:1,
          parentHash:"",
          receiptsRoot:"",
          sha3Uncles:"",
          size:"",
          stateRoot:"",
          timestamp:1,
          totalDifficulty:"",
          transactions: {} as any,
          transactionsRoot:'',
          uncles:[]
      }
    })
  
    beforeAll(() => {
      handleBlock = agent.handleBlock
    })
  
    describe("handle block", () => {
      it("diff not changed in first run", async () => {
        const txEvent = createTxEventWithDiff("0x1")
  
        const findings = await handleBlock(txEvent)
  
        expect(findings).toStrictEqual([])
      })
  
      it("returns a finding if diff geow", async () => {
        const txEvent = createTxEventWithDiff("0x2")
  
        const findings = await handleBlock(txEvent)
  
        expect(findings).toHaveLength(1)
      })
    })
  })