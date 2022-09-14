import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { ethers } from "ethers";
import { useState } from "react";

function TransferNft() {
  const [conAddress, setAddress] = useState(
    "0x837BA22c8a47c667bB44e75Bd799e782796Ddaab"
  );
  const [nftId, setNftId] = useState();
  const [fromAddress, setFromAddress] = useState(
    "0xA255872E5a065F8a3a14fF934C66C41fee404198"
  );
  const [toAddress, setToAddress] = useState(
    "0xF805d680CF173c2bf0c904a10405A823011FEDF4"
  );
  const [isLoading, setIsLoading] = useState(false);

  const key = "nX5inHQTZGuI68uaIhtVTJuDihC4kBfk";

  const transfer = async (event) => {
    setIsLoading(true);
    if (
      !ethers.utils.isAddress(conAddress) ||
      !ethers.utils.isAddress(toAddress) ||
      !ethers.utils.isAddress(fromAddress) ||
      !nftId
    ) {
      setIsLoading(false);
      alert("Please Add Valid Address");
      return;
    }
    axios
      .post(
        `https://thentic.tech/api/nfts/transfer`,
        {
            key,
            chain_id: 80001,
            contract: conAddress,
            nft_id: nftId,
            from: fromAddress,
            to: toAddress,
        },
        {
          headers: {
            "content-type": "application/json",
          }
        }
      )
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
        <Form.Label>NFT Id</Form.Label>
        <Form.Control
          onChange={(e) => setNftId(e.target.value)}
          type="text"
          placeholder="NFT Id"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicData">
        <Form.Label>Sender</Form.Label>
        <Form.Control
          defaultValue={"0xA255872E5a065F8a3a14fF934C66C41fee404198"}
          onChange={(e) => setFromAddress(e.target.value)}
          type="text"
          placeholder="Sender Address"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicData">
        <Form.Label>Receiver</Form.Label>
        <Form.Control
          defaultValue={"0xF805d680CF173c2bf0c904a10405A823011FEDF4"}
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
        <Button onClick={transfer} variant="primary" type="button">
          Transfer NFT
        </Button>
      )}
    </>
  );
}

export default TransferNft;
