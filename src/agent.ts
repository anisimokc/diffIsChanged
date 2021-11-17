import { 
  BlockEvent, 
  Finding, 
  HandleBlock, 
  FindingSeverity, 
  FindingType,
} from 'forta-agent'



let PREV_DIF =0
let FIRST_RUN = true
const handleBlock: HandleBlock = async (blockEvent: BlockEvent) => {
  const findings: Finding[] = [];
  const dif = parseInt(blockEvent.block.difficulty,16)
  if (dif!==PREV_DIF && !FIRST_RUN){
    findings.push(Finding.fromObject({
      name: "DIFF CHANGED",
      description: `difficulty changed, block ${blockEvent.blockNumber}  difficulty ${dif}`,
      alertId: "FORTA-100",
      severity: FindingSeverity.Info,
      type: FindingType.Info,
    }))
  }
  PREV_DIF = dif
  if (FIRST_RUN){
    FIRST_RUN = false
  }
  
  return findings;
}

export default {
  handleBlock
}