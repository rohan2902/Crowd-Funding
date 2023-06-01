import web3 from "../web3";
import CrowdHelp from "../../artifacts/contracts/CrowdHelp.sol/CrowdHelp.json";

const crowdHelpContractAddress = "0xeaF593d7B2635f62F88718eBa4551b8A0D62370B";
// const crowdHelpContractAddress = "0x343AF43e8599aAA64B8f14E98b4292940BCb9353";
const crowdHelp = new web3.eth.Contract(
  CrowdHelp.abi,
  crowdHelpContractAddress
);

export default crowdHelp;
