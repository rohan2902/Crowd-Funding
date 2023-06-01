import {
  ErrorRounded,
  LocalConvenienceStoreOutlined,
} from "@mui/icons-material";
import {
  Button,
  Container,
  TextField,
  Typography,
  styled,
  Avatar,
  Link,
  Box,
  Grid,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import React, { useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { LoadingButton } from "@mui/lab";
// local imports...
import NavBar from "../../components/NavBar";

// service imports..
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import moment from "moment";

import abiToken from "../../../artifacts/contracts/TokenFactory.sol/TokenFactory.json";


  

// Wallet connection..
import { useWallet } from "use-wallet";

// smart-contract interaction -- for campaign creation..
import crowdHelp from "../../../utils/contract/crowdHelp";
import web3 from "../../../utils/web3";

const api_url = "http://localhost:4000/api/";

function FillCampaignDetails() {
  const wallet = useWallet();
  const navigate = useNavigate();

  // hooks for getting form data..
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onChange",
  });
  const [data, setData] = React.useState("");
  const [error, setError] = React.useState("");
 
  const contractBytecode = "0x608060405234801561001057600080fd5b50612038806100206000396000f3fe60806040523480156200001157600080fd5b50600436106200002e5760003560e01c806321c163341462000033575b600080fd5b6200005160048036038101906200004b919062000304565b62000053565b005b6000848484846040516200006790620000e0565b6200007694939291906200045f565b604051809103906000f08015801562000093573d6000803e3d6000fd5b5090508073ffffffffffffffffffffffffffffffffffffffff167f2e2b3f61b70d2d131b2a807371103cc98d51adcaa5e9a8f9c32658ad8426e74e60405160405180910390a25050505050565b611b4880620004bb83390190565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b62000157826200010c565b810181811067ffffffffffffffff821117156200017957620001786200011d565b5b80604052505050565b60006200018e620000ee565b90506200019c82826200014c565b919050565b600067ffffffffffffffff821115620001bf57620001be6200011d565b5b620001ca826200010c565b9050602081019050919050565b82818337600083830152505050565b6000620001fd620001f784620001a1565b62000182565b9050828152602081018484840111156200021c576200021b62000107565b5b62000229848285620001d7565b509392505050565b600082601f83011262000249576200024862000102565b5b81356200025b848260208601620001e6565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620002918262000264565b9050919050565b620002a38162000284565b8114620002af57600080fd5b50565b600081359050620002c38162000298565b92915050565b6000819050919050565b620002de81620002c9565b8114620002ea57600080fd5b50565b600081359050620002fe81620002d3565b92915050565b60008060008060808587031215620003215762000320620000f8565b5b600085013567ffffffffffffffff811115620003425762000341620000fd565b5b620003508782880162000231565b945050602085013567ffffffffffffffff811115620003745762000373620000fd565b5b620003828782880162000231565b93505060406200039587828801620002b2565b9250506060620003a887828801620002ed565b91505092959194509250565b600081519050919050565b600082825260208201905092915050565b60005b83811015620003f0578082015181840152602081019050620003d3565b60008484015250505050565b60006200040982620003b4565b620004158185620003bf565b935062000427818560208601620003d0565b62000432816200010c565b840191505092915050565b620004488162000284565b82525050565b6200045981620002c9565b82525050565b600060808201905081810360008301526200047b8187620003fc565b90508181036020830152620004918186620003fc565b9050620004a260408301856200043d565b620004b160608301846200044e565b9594505050505056fe60806040526012600260006101000a81548160ff021916908360ff1602179055503480156200002d57600080fd5b5060405162001b4838038062001b4883398181016040528101906200005391906200041b565b838381600090816200006691906200070c565b5080600190816200007891906200070c565b5050506200008d82826200009760201b60201c565b5050505062000934565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160362000109576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040162000100906200087a565b60405180910390fd5b80600360008282546200011d9190620008cb565b9250508190555080600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254620001759190620008cb565b925050819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051620001dc919062000917565b60405180910390a35050565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b620002518262000206565b810181811067ffffffffffffffff8211171562000273576200027262000217565b5b80604052505050565b600062000288620001e8565b905062000296828262000246565b919050565b600067ffffffffffffffff821115620002b957620002b862000217565b5b620002c48262000206565b9050602081019050919050565b60005b83811015620002f1578082015181840152602081019050620002d4565b60008484015250505050565b6000620003146200030e846200029b565b6200027c565b90508281526020810184848401111562000333576200033262000201565b5b62000340848285620002d1565b509392505050565b600082601f83011262000360576200035f620001fc565b5b815162000372848260208601620002fd565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620003a8826200037b565b9050919050565b620003ba816200039b565b8114620003c657600080fd5b50565b600081519050620003da81620003af565b92915050565b6000819050919050565b620003f581620003e0565b81146200040157600080fd5b50565b6000815190506200041581620003ea565b92915050565b60008060008060808587031215620004385762000437620001f2565b5b600085015167ffffffffffffffff811115620004595762000458620001f7565b5b620004678782880162000348565b945050602085015167ffffffffffffffff8111156200048b576200048a620001f7565b5b620004998782880162000348565b9350506040620004ac87828801620003c9565b9250506060620004bf8782880162000404565b91505092959194509250565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200051e57607f821691505b602082108103620005345762000533620004d6565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026200059e7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826200055f565b620005aa86836200055f565b95508019841693508086168417925050509392505050565b6000819050919050565b6000620005ed620005e7620005e184620003e0565b620005c2565b620003e0565b9050919050565b6000819050919050565b6200060983620005cc565b620006216200061882620005f4565b8484546200056c565b825550505050565b600090565b6200063862000629565b62000645818484620005fe565b505050565b5b818110156200066d57620006616000826200062e565b6001810190506200064b565b5050565b601f821115620006bc5762000686816200053a565b62000691846200054f565b81016020851015620006a1578190505b620006b9620006b0856200054f565b8301826200064a565b50505b505050565b600082821c905092915050565b6000620006e160001984600802620006c1565b1980831691505092915050565b6000620006fc8383620006ce565b9150826002028217905092915050565b6200071782620004cb565b67ffffffffffffffff81111562000733576200073262000217565b5b6200073f825462000505565b6200074c82828562000671565b600060209050601f8311600181146200078457600084156200076f578287015190505b6200077b8582620006ee565b865550620007eb565b601f19841662000794866200053a565b60005b82811015620007be5784890151825560018201915060208501945060208101905062000797565b86831015620007de5784890151620007da601f891682620006ce565b8355505b6001600288020188555050505b505050505050565b600082825260208201905092915050565b7f4d696e7420746f207a65726f2061646472657373206973206e6f7420616c6c6f60008201527f7765640000000000000000000000000000000000000000000000000000000000602082015250565b600062000862602383620007f3565b91506200086f8262000804565b604082019050919050565b60006020820190508181036000830152620008958162000853565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000620008d882620003e0565b9150620008e583620003e0565b92508282019050808211156200090057620008ff6200089c565b5b92915050565b6200091181620003e0565b82525050565b60006020820190506200092e600083018462000906565b92915050565b61120480620009446000396000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c80633950935111610071578063395093511461016857806370a082311461019857806395d89b41146101c8578063a457c2d7146101e6578063a9059cbb14610216578063dd62ed3e14610246576100a9565b806306fdde03146100ae578063095ea7b3146100cc57806318160ddd146100fc57806323b872dd1461011a578063313ce5671461014a575b600080fd5b6100b6610276565b6040516100c39190610caf565b60405180910390f35b6100e660048036038101906100e19190610d6a565b610304565b6040516100f39190610dc5565b60405180910390f35b6101046103f6565b6040516101119190610def565b60405180910390f35b610134600480360381019061012f9190610e0a565b6103fc565b6040516101419190610dc5565b60405180910390f35b610152610566565b60405161015f9190610e79565b60405180910390f35b610182600480360381019061017d9190610d6a565b610579565b60405161018f9190610dc5565b60405180910390f35b6101b260048036038101906101ad9190610e94565b6106f9565b6040516101bf9190610def565b60405180910390f35b6101d0610711565b6040516101dd9190610caf565b60405180910390f35b61020060048036038101906101fb9190610d6a565b61079f565b60405161020d9190610dc5565b60405180910390f35b610230600480360381019061022b9190610d6a565b6109dc565b60405161023d9190610dc5565b60405180910390f35b610260600480360381019061025b9190610ec1565b6109f3565b60405161026d9190610def565b60405180910390f35b6000805461028390610f30565b80601f01602080910402602001604051908101604052809291908181526020018280546102af90610f30565b80156102fc5780601f106102d1576101008083540402835291602001916102fc565b820191906000526020600020905b8154815290600101906020018083116102df57829003601f168201915b505050505081565b600081600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040516103e49190610def565b60405180910390a36001905092915050565b60035481565b6000600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020548211156104bd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104b490610fad565b60405180910390fd5b81600560008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546105499190610ffc565b9250508190555061055b848484610a18565b600190509392505050565b600260009054906101000a900460ff1681565b600081600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546106079190611030565b925050819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546040516106e79190610def565b60405180910390a36001905092915050565b60046020528060005260406000206000915090505481565b6001805461071e90610f30565b80601f016020809104026020016040519081016040528092919081815260200182805461074a90610f30565b80156107975780601f1061076c57610100808354040283529160200191610797565b820191906000526020600020905b81548152906001019060200180831161077a57829003601f168201915b505050505081565b600080600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905082811015610864576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161085b906110b0565b60405180910390fd5b82816108709190610ffc565b600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508373ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546040516109c99190610def565b60405180910390a3600191505092915050565b60006109e9338484610a18565b6001905092915050565b6005602052816000526040600020602052806000526040600020600091509150505481565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610a87576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a7e90611142565b60405180910390fd5b80600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015610b09576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b00906111ae565b60405180910390fd5b80600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610b589190610ffc565b9250508190555080600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610bae9190611030565b925050819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610c129190610def565b60405180910390a3505050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610c59578082015181840152602081019050610c3e565b60008484015250505050565b6000601f19601f8301169050919050565b6000610c8182610c1f565b610c8b8185610c2a565b9350610c9b818560208601610c3b565b610ca481610c65565b840191505092915050565b60006020820190508181036000830152610cc98184610c76565b905092915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610d0182610cd6565b9050919050565b610d1181610cf6565b8114610d1c57600080fd5b50565b600081359050610d2e81610d08565b92915050565b6000819050919050565b610d4781610d34565b8114610d5257600080fd5b50565b600081359050610d6481610d3e565b92915050565b60008060408385031215610d8157610d80610cd1565b5b6000610d8f85828601610d1f565b9250506020610da085828601610d55565b9150509250929050565b60008115159050919050565b610dbf81610daa565b82525050565b6000602082019050610dda6000830184610db6565b92915050565b610de981610d34565b82525050565b6000602082019050610e046000830184610de0565b92915050565b600080600060608486031215610e2357610e22610cd1565b5b6000610e3186828701610d1f565b9350506020610e4286828701610d1f565b9250506040610e5386828701610d55565b9150509250925092565b600060ff82169050919050565b610e7381610e5d565b82525050565b6000602082019050610e8e6000830184610e6a565b92915050565b600060208284031215610eaa57610ea9610cd1565b5b6000610eb884828501610d1f565b91505092915050565b60008060408385031215610ed857610ed7610cd1565b5b6000610ee685828601610d1f565b9250506020610ef785828601610d1f565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680610f4857607f821691505b602082108103610f5b57610f5a610f01565b5b50919050565b7f496e73756666696369656e7420616c6c6f77616e636500000000000000000000600082015250565b6000610f97601683610c2a565b9150610fa282610f61565b602082019050919050565b60006020820190508181036000830152610fc681610f8a565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061100782610d34565b915061101283610d34565b925082820390508181111561102a57611029610fcd565b5b92915050565b600061103b82610d34565b915061104683610d34565b925082820190508082111561105e5761105d610fcd565b5b92915050565b7f44656372656173656420616c6c6f77616e63652062656c6f77207a65726f0000600082015250565b600061109a601e83610c2a565b91506110a582611064565b602082019050919050565b600060208201905081810360008301526110c98161108d565b9050919050565b7f5472616e7366657220746f207a65726f2061646472657373206973206e6f742060008201527f616c6c6f77656400000000000000000000000000000000000000000000000000602082015250565b600061112c602783610c2a565b9150611137826110d0565b604082019050919050565b6000602082019050818103600083015261115b8161111f565b9050919050565b7f496e73756666696369656e742062616c616e636520746f207472616e73666572600082015250565b6000611198602083610c2a565b91506111a382611162565b602082019050919050565b600060208201905081810360008301526111c78161118b565b905091905056fea2646970667358221220f025e1b84248c6d2d341bed18d3c304ede6784ee71ca37b214d713e43b0b39b964736f6c63430008110033a26469706673582212202f9635deaf4238b0e003f0c9a9ab840cdf1b7aca47515da9374c0f61605bcc2864736f6c63430008110033";

  // hooks to handle acknowledgements..
  // hooks..
  const [responseMsg, setResponseMsg] = React.useState(""); // to display error messages.
  const [showResponse, setShowResponse] = React.useState(false); // To know whether error occured. ⁉ why not use length of error message
  const [responseSeverity, setResponseSeverity] = React.useState("error");

  // helpers..
  async function handleFilledCampaignDetails(data) {
    console.log("ABout to print data");
    console.log(data);
    console.log("deadline: " + data.deadlineDate + " " + data.deadlineTime);
    const timestamp = moment(
      data.deadlineDate + " " + data.deadlineTime,
      "YYYY-MM-DD HH:mm"
    ).valueOf();
    console.log(timestamp);
    console.log("timestamp printed");

    try {
      const accounts = await web3.eth.getAccounts();
      // Create campaign by taking all the details..
      await crowdHelp.methods
        .createCampaign(
          data.title,
          data.description,
          web3.utils.toWei(data.minContribAmount, "ether"),
          web3.utils.toWei(data.ethRaised, "ether"),
          timestamp,
          data.bannerUrl,
        )
        .send({
          from: accounts[0],
        });

        console.log(accounts[0]);

        await createNewContract(data.NameOfToken,data.SymbolOfToken,accounts[0],data.TotalOffering);

      // After successful creation..
      ///// REQUIRED: Find way to get the created campaign address, so that, can navigate to that page.
      navigate("/"); // navigate to home page
    } catch (err) {
      // upon error.. be on the same page and show the error.
      setError(err.message);
      console.log(err);
    } finally {
      console.log("job done");
    }
  }



  async function createNewContract(name, symbol, owner, initialSupply) {
    const accounts = await web3.eth.getAccounts();
    
    const contract = new web3.eth.Contract(abiToken.abi);
    
    const deployTransaction = contract.deploy({
      data: contractBytecode,
      arguments: [name, symbol, owner, initialSupply]
    });
    
    const gas = await deployTransaction.estimateGas();
    
    const deployedContract = await deployTransaction.send({
      from: accounts[0],
      gas
    });
    
    const contractAddress = deployedContract.options.address;
    
    console.log('New contract address:', contractAddress);
  }


  const StyledDivLayout = styled("div")(({ theme }) => ({
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  }));

  const StyledDivPaper = styled("div")(({ theme }) => ({
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  }));

  const StyledContainer = styled(Container)(({ theme }) => ({
    [theme.breakpoints.up("sm")]: {
      width: "80%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "40%",
    },
  }));

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowResponse(false);
  };

  return (
    <>
      <NavBar />
      <StyledContainer
        sx={{
          width: "80%",
        }}
      >
        <StyledDivLayout>
          <StyledDivPaper>
            <Typography
              variant="h5"
              textAlign={"center"}
              fontWeight="bold"
              sx={{ paddingBottom: 2.5 }}
            >
              Campaign Details
            </Typography>
            {/* Handle wallet connection here.. */}
            {wallet.status !== "connected" ? (
              <Alert
                sx={{ marginBottom: 2 }}
                severity="warning"
                action={
                  <Button
                    color="inherit"
                    size="small"
                    onClick={() => wallet.connect()}
                  >
                    Connect
                  </Button>
                }
              >
                Please connect your wallet to proceed.
              </Alert>
            ) : (
              wallet.status === "error" && (
                <Alert
                  sx={{ marginBottom: 2 }}
                  severity="error"
                  action={
                    <Button
                      color="inherit"
                      size="small"
                      onClick={() => wallet.connect()}
                    >
                      Try again
                    </Button>
                  }
                >
                  Error connecting to wallet.
                </Alert>
              )
            )}

            {/* For displaying errors.. */}
            {error && (
              <Alert sx={{ marginBottom: 2, marginTop: 2 }} severity="error">
                {error}
              </Alert>
            )}
            {errors.title ||
            errors.description ||
            errors.bannerUrl ||
            errors.minContribAmount ||
            errors.ethRaised ||
            errors.walletAddress ||
            errors.deadlineDate ||
            errors.deadlineTime ? (
              <Alert sx={{ marginBottom: 2, marginTop: 2 }} severity="error">
                All fields are required
              </Alert>
            ) : null}

            <form
              autoComplete="on"
              onSubmit={handleSubmit(handleFilledCampaignDetails)}
            >
              <Grid
                container
                spacing={1.5}
                direction="row"
                justify="center"
                alignItems="stretch"
              >
                <Grid item xs={6} spacing={0}>
                  <Box display={"flex"} flexDirection="column" gap={2}>
                    <TextField
                      id="title"
                      {...register("title", { required: true })}
                      label="Campaign Title"
                      size="small"
                      fullWidth
                      disabled={isSubmitting}
                      variant="outlined"
                      helperText="About this campaign in 2-3 words"
                    />
                    <TextField
                      id="minContribAmount"
                      {...register("minContribAmount", { required: true })}
                      label="Minimum contribution amount"
                      size="small"
                      type="number"
                      inputProps={{
                        min: 0,
                        step: 0.00001,
                      }}
                      fullWidth
                      variant="outlined"
                      helperText="How much minimum amount you are expecting from backers?"
                      disabled={isSubmitting}
                    />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Grid styl={{ height: "70%" }}>
                    <TextField
                      id="description"
                      name="description"
                      {...register("description", { required: true })}
                      label="Campaign Description"
                      size="small"
                      multiline
                      rows={4.3}
                      fullWidth
                      helperText="Help people know about this campaign. Keep it simple and short."
                      disabled={isSubmitting}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="ethRaised"
                    {...register("ethRaised", { required: true })}
                    label="Goal (Matic)"
                    fullWidth
                    size="small"
                    type="number"
                    helperText="Amount to be raised"
                    inputProps={{
                      // min: 0.00000001,
                      step: 0.00001,
                    }}
                    disabled={isSubmitting}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="bannerUrl"
                    {...register("bannerUrl", { required: true })}
                    label="Banner Image URL"
                    type="url"
                    size="small"
                    fullWidth
                    title="This image will be shown as a banner"
                    helperText="Preferably from unsplash.com, flaticon.com, pexels.com."
                    disabled={isSubmitting}
                  />
                </Grid>

                 {/* <Grid item xs={12} sm={6}>
                  <TextField
                    id="TotalOffering"
                    {...register("TotalOffering", { required: true })}
                    label="Total Shares "
                    type= "number"
                    size="small"
                    fullWidth
                    title="Total Offering Equity "
                    helperText="Total Amount of Tokens you want to create"
                    
                  />
                </Grid> 

                <Grid item xs={12} sm={6}>
                  <TextField
                    id="OfferingToDonors"
                    {...register("OfferingToDonors", { required: true })}
                    label="Total Shares to Donors"
                    type= "number"
                    size="small"
                    fullWidth
                    title="Total Offering Equity Percentage"
                    helperText="Percentage to Donors"
                    
                  />
                </Grid> 

                <Grid item xs={12} sm={6}>
                  <TextField
                    id="NameOfToken"
                    {...register("NameOfToken", { required: true })}
                    label="Name of New Token"
                    size="small"
                    fullWidth
                    title="Name Of Token"
                    helperText="Write Name of Token"
                    
                  />
                </Grid> 

                <Grid item xs={12} sm={6}>
                  <TextField
                    id="SymbolOfToken"
                    {...register("SymbolOfToken", { required: true })}
                    label="Symbol"
                    size="small"
                    fullWidth
                    title="Symbol of Token"
                    helperText="Symbol for your Token"
                    
                  />
                </Grid>  */}

                <Grid item xs={12} sm={6}>
                  <Box sx={{ padding: 0, margin: 0 }}>
                    <Typography variant="caption" color="GrayText">
                      Campaign ends at
                    </Typography>
                    <Box display={"flex"} flexDirection="row" gap={2}>
                      <TextField
                        id="deadlineDate"
                        {...register("deadlineDate", { required: true })}
                        type={"date"}
                        inputProps={{
                          min: `${new Date(
                            new Date().getTime() + 1 * 1 * 60 * 60 * 1000 // +1 day
                          )
                            .toJSON()
                            .slice(0, 10)}`,
                        }}
                        size="small"
                        disabled={isSubmitting}
                      />
                      <TextField
                        id="deadlineTime"
                        {...register("deadlineTime", { required: true })}
                        type={"time"}
                        size="small"
                        disabled={isSubmitting}
                      />
                    </Box>
                    <Typography variant="caption" color="GrayText">
                      Please set a reasonable range, neither too short nor too
                      long.
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6} style={{paddingTop:0}}>
                  {/* Just to be aligned with the date&time. */}
                  <Typography variant="caption">&nbsp;</Typography>
                  <TextField
                    required
                    id="walletAddress"
                    name="walletAddress"
                    label="Wallet Address"
                    fullWidth
                    value={wallet.account}
                    inputProps={{
                      readOnly: "read-only",
                    }}
                    title="Read-only value"
                    size="small"
                    helperText={
                      wallet.status === "connected"
                        ? "This is connected wallet's address. To switch please re-login with required wallet."
                        : "Please connect to the wallet"
                    }
                    disabled={isSubmitting}
                    
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        required
                        color="secondary"
                        name="acceptConditions"
                        value="yes"
                      />
                    }
                    label="I/We understand that, once these fields are set cannot be updated."
                  />
                </Grid>
              </Grid>
              <LoadingButton
                type="submit"
                loading={isSubmitting}
                variant="contained"
                color="success"
                disabled={isSubmitting}
              >
                Create Campaign
              </LoadingButton>
            </form>
          </StyledDivPaper>
        </StyledDivLayout>
      </StyledContainer>
      <Snackbar
        open={showResponse}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert onClose={handleClose} severity={responseSeverity}>
          {responseMsg}
        </Alert>
      </Snackbar>
    </>
  );
}

export default FillCampaignDetails;
