import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { ethers } from "ethers";
import { useState } from "react";

function MintNft() {
  const [conAddress, setAddress] = useState(
    "0x837BA22c8a47c667bB44e75Bd799e782796Ddaab"
  );
  const [isLoading, setIsLoading] = useState(false);

  const [nftData, setNftData] = useState("Dummy");
  const [toAddress, setToAddress] = useState(
    "0xA255872E5a065F8a3a14fF934C66C41fee404198"
  );

  const contractABI = require("../ABI.json");
  const key = "UxmmBU2HSIsiJTcfv1IFHWJ8JrjH5RmC";

  const getCurrentNFTid = async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      `https://rpc-mumbai.maticvigil.com`
    );
    const contract = new ethers.Contract(
      "0x837BA22c8a47c667bB44e75Bd799e782796Ddaab",
      contractABI,
      provider
    );
    const id = await contract.getLatestId();
    return id;
  };

  const mint = async (event) => {
    setIsLoading(true);
    let id = await getCurrentNFTid();
    id = id.toNumber() + 1
    if (
      !ethers.utils.isAddress(conAddress) ||
      !ethers.utils.isAddress(toAddress)
    ) {
      setIsLoading(false);

      alert("Please Add Valid Address");
      return;
    }
    axios
      .post(`https://thentic.tech/api/nfts/mint`, {
          key: key,
          chain_id: 80001,
          contract: conAddress,
          nft_id: id,
          nft_data: nftData,
          to: toAddress,
      })
      .then((response) => {
        setIsLoading(false);
        alert('success: Please Check console for Info!')
        console.log(response);
      })
      .catch((err) => {
        setIsLoading(false);
        alert("Something wend Wrong: Please Check Console")
        console.log(err);
      });
  };

  return (
    <>
      <Form.Group className="mb-3" controlId="formBasicAddress">
        <Form.Label>Contract Address</Form.Label>
        <Form.Control
          defaultValue={"0x837BA22c8a47c667bB44e75Bd799e782796Ddaab"}
          type="text"
          onChange={(e) => setAddress(e.target.value)}
          placeholder="NFT Contract Address"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicData">
        <Form.Label>NFT Data</Form.Label>
        <Form.Control
          defaultValue={"Dummy"}
          onChange={(e) => setNftData(e.target.value)}
          type="text"
          placeholder="NFT Data"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicData">
        <Form.Label>Reciever</Form.Label>
        <Form.Control
          defaultValue={"0xA255872E5a065F8a3a14fF934C66C41fee404198"}
          onChange={(e) => setToAddress(e.target.value)}
          type="text"
          placeholder="Receiver Address"
        />
      </Form.Group>
      {isLoading ? (
        <Button disabled variant="primary" type="button">
          Loading....
        </Button>
      ) : (
        <Button onClick={mint} variant="primary" type="button">
          Mint NFT
        </Button>
      )}
    </>
  );
}

export default MintNft;
