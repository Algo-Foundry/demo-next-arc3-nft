import Button from "./Button";

function NftItem({ src, metadata, assetId, onButtonClick }) {
  return (
    <div className="flex flex-row items-center gap-4 mb-4">
      <img src={src} alt="Image" className="w-1/4" />

      <div className="flex flex-col items-start">
        <div className="w-full sm:w-1/2 overflow-auto bg-gray-100 rounded-md mb-4">
          <span>Asset ID: {assetId}</span>
          <pre className="p-4">{JSON.stringify(metadata, null, 2)}</pre>
        </div>
        <Button label="Get NFT" onClick={() => onButtonClick(assetId)} />
      </div>
    </div>
  );
}

export default NftItem;
