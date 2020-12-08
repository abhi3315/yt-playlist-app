import React from "react";
import Header from "./Header";
import BulkUploadDrawer from "./BulkUploadDrawer";

export default function App() {
  const [bulkUploadDrawer, setBulkUploadDrawer] = React.useState(false);

  const toggleBulkUploadDrawer = () => {
    setBulkUploadDrawer((prevState) => !prevState);
  };

  return (
    <div>
      <Header toggleDrawer={toggleBulkUploadDrawer} />
      <BulkUploadDrawer
        isOpen={bulkUploadDrawer}
        toggleDrawer={toggleBulkUploadDrawer}
      />
    </div>
  );
}
