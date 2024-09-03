import React, { useState } from "react";
import "./DocumentPage.css";
const apiUrl = process.env.REACT_APP_API_URL;

const DocumentPage = () => {

    const [selectedTab, setSelectedTab] = useState('general');

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };
  return (
    <div className="document-page">
      <header className="document-header">
        <h1>mVAC medical lubricated rotary vane system</h1>
        <p>Click on the ⦿ to view documents.</p>
      </header>
      
      <div className="tabs">
        <div className="tab active" onClick={() => handleTabChange('general')}>General Documents</div>
        <div className="tab" onClick={() => handleTabChange('installation')}>Installation/Maintenance Documents</div>
      </div>
      {selectedTab === 'general' && (
      <div className="document-table">
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Specification Sheet</th>
              <th>General Assembly Drawing</th>
              <th>Sales Brochure</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>mVAC Medical Lubricated Rotary Vane System 50Hz</td>
              <td><button className="doc-icon">⦿</button></td>
              <td><button className="doc-icon">⦿</button></td>
              <td><button className="doc-icon">⦿</button></td>
            </tr>
            <tr>
              <td>mVAC Medical Lubricated Rotary Vane System 60Hz</td>
              <td><button className="doc-icon">⦿</button></td>
              <td><button className="doc-icon">⦿</button></td>
              <td><button className="doc-icon">⦿</button></td>
            </tr>
          </tbody>
        </table>
      </div>
      )}
      {selectedTab === 'installation' && (
        <div className="document-table">
        <table>
          <thead>
            <tr>
              <th>nms D</th>
              <th> Sheet</th>
              <th>General Assembly Drawing</th>
              <th>Sales Brochure</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>mVAC Medical Lubricated Rotary Vane System 50Hz</td>
              <td><button className="doc-icon">⦿</button></td>
              <td><button className="doc-icon">⦿</button></td>
              <td><button className="doc-icon">⦿</button></td>
            </tr>
            <tr>
              <td>mVAC Medical Lubricated Rotary Vane System 60Hz</td>
              <td><button className="doc-icon">⦿</button></td>
              <td><button className="doc-icon">⦿</button></td>
              <td><button className="doc-icon">⦿</button></td>
            </tr>
          </tbody>
        </table>
      </div>
      )}
    </div>
  );
};

export default DocumentPage;
