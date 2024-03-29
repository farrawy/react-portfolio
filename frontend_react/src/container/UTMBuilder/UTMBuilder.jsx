import React, { useEffect, useState } from "react";
import "./UTMBuilder.scss";
import { Toaster, toast } from "react-hot-toast";
import { images } from "../../constants";
// import * as XLSX from "xlsx";
import { AppWrap, MotionWrap } from "../../wrapper";

function UtmBuilder() {
  const [url, setUrl] = useState("");
  const [campaignSource, setCampaignSource] = useState("");
  const [campaignMedium, setCampaignMedium] = useState("");
  const [campaignName, setCampaignName] = useState("");
  const [utmUrl, setUtmUrl] = useState("");
  const [utmUrlHistory, setUtmUrlHistory] = useState([]);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams({
      utm_source: campaignSource,
      utm_medium: campaignMedium,
      utm_campaign: campaignName,
    }).toString();
    let newUtmUrl = `${url}?${params}`;

    // Format and validate the URL
    newUtmUrl = formatAndValidateUrl(newUtmUrl);

    if (!newUtmUrl) return;

    if (newUtmUrl) {
      setUtmUrl(newUtmUrl);

      setUrl("");
      setCampaignSource("");
      setCampaignMedium("");
      setCampaignName("");

      // Update the UTM Url history in the state and local storage
      const updatedUrlHistory = [...utmUrlHistory, newUtmUrl];
      setUtmUrlHistory(updatedUrlHistory);
      localStorage.setItem("utmUrl-history", JSON.stringify(updatedUrlHistory));
    } else {
      console.error("Invalid URL");
    }
  };

  const clearUTMUrlHistory = () => {
    setUtmUrlHistory([]);
    localStorage.setItem("utmUrl-history", JSON.stringify([]));
  };

  const removeFromUTMUrlHistory = (id) => {
    const updatedUrlHistory = utmUrlHistory.filter(
      (url, index) => index !== id,
    );
    setUtmUrlHistory(updatedUrlHistory);
    localStorage.setItem("utmUrl-history", JSON.stringify(updatedUrlHistory));
  };

  const formatExternalUrl = (url) => {
    if (!url) return url;
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    } else {
      return `https://${url}`;
    }
  };

  const formatAndValidateUrl = (url) => {
    if (!url) return null; // Return null for empty URLs

    // Ensure the URL starts with http:// or https://
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = `https://${url}`;
    }

    // Validate the URL
    try {
      new URL(url); // This will throw an error if the URL is invalid
      return url;
    } catch (error) {
      console.error(`Invalid URL: ${url}`);
      return null;
    }
  };

  // const exportToExcel = (data, fileName) => {
  //   const ws = XLSX.utils.json_to_sheet(data);
  //   const wb = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  //   XLSX.writeFile(wb, `${fileName}.xlsx`);
  // };

  // const handleExportToExcel = () => {
  //   const formattedData = utmUrlHistory.map((url) => {
  //     const urlObj = new URL(url);
  //     return {
  //       URL: urlObj.origin + urlObj.pathname,
  //       "Campaign Source": urlObj.searchParams.get("utm_source") || "",
  //       "Campaign Medium": urlObj.searchParams.get("utm_medium") || "",
  //       "Campaign Name": urlObj.searchParams.get("utm_campaign") || "",
  //     };
  //   });

  //   exportToExcel(formattedData, `UTM_URL_HISTORY_${Date.now()}`);
  // };

  useEffect(() => {
    const storedUtmUrl = localStorage.getItem("utmUrl-history");
    if (storedUtmUrl) {
      const parsedUtmUrl = JSON.parse(storedUtmUrl);
      if (parsedUtmUrl) {
        setUtmUrlHistory(parsedUtmUrl);
        console.log("storedUtmUrl", parsedUtmUrl);
      }
    }
  }, []);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess(true);
      toast.success("Copied to clipboard");
      setTimeout(() => {
        setCopySuccess(false);
      }, 3000);
    });
  };

  return (
    <div className="app__utm-builder">
      <h2 className="header">UTM Builder</h2>
      <p className="subheader">
        Use this tool to build UTM URLs for your campaigns. Fill in the required
        fields (marked with *). A final URL with UTM codes will be automatically
        generated.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="form_group">
          <label>
            Website URL
            <span>*</span>
          </label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>
        <div className="form_group">
          <label>
            Campaign Source
            <span>*</span>
          </label>
          <div>
            <input
              type="text"
              value={campaignSource}
              onChange={(e) => setCampaignSource(e.target.value)}
              required
            />
            <span>
              e.g. Google, Facebook, Newsletter, etc. This is the referrer of
              your traffic.
            </span>
          </div>
        </div>
        <div className="form_group">
          <label>
            Campaign Medium
            <span>*</span>
          </label>
          <div>
            <input
              type="text"
              value={campaignMedium}
              onChange={(e) => setCampaignMedium(e.target.value)}
              required
            />
            <span>
              e.g. CPC, Social, Email, etc. This is the marketing medium of your
              traffic.
            </span>
          </div>
        </div>
        <div className="form_group">
          <label>
            Campaign Name
            <span>*</span>
          </label>
          <div>
            <input
              type="text"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              required
            />
            <span>
              e.g. Summer_Sale, Black_Friday, etc. This is the name of your
              campaign.
            </span>
          </div>
        </div>
        <button type="submit">Generate UTM URL</button>
      </form>
      {utmUrl && (
        <div className="generated-url">
          <label>Generated UTM URL:</label>
          <div className="utm-url">
            <a
              href={formatExternalUrl(utmUrl)}
              target="_blank"
              onClick={() => copyToClipboard(utmUrl)}>
              {utmUrl}
            </a>
            <img
              src={images.copyIcon}
              alt="copy"
              onClick={() => copyToClipboard(utmUrl)}
              className="icon"
            />
          </div>
        </div>
      )}

      {
        // Show the UTM Url history only if there is at least one item in the history
        utmUrlHistory.length > 0 && (
          <div className="generated-url">
            <div>
              <label>UTM URL History:</label>
              <div>
                <button
                  className="clear-history-btn"
                  onClick={clearUTMUrlHistory}>
                  Clear History
                </button>
                {/* <button onClick={handleExportToExcel}>Export To Excel</button> */}
              </div>
            </div>
            <div className="utm-url-history__list">
              {utmUrlHistory.map((url, index) => (
                <div key={index} className="utm-url-history__list__item">
                  <a
                    href={formatExternalUrl(url)}
                    target="_blank"
                    onClick={() => copyToClipboard(url)}>
                    {url}
                  </a>
                  <img
                    src={images.copyIcon}
                    alt="copy"
                    onClick={() => copyToClipboard(url)}
                    className="icon"
                  />
                  <img
                    src={images.deleteIcon}
                    alt="delete"
                    onClick={() => removeFromUTMUrlHistory(index)}
                    className="icon"
                  />
                </div>
              ))}
            </div>
          </div>
        )
      }

      <div>
        <Toaster />
      </div>
    </div>
  );
}

export default AppWrap(
  MotionWrap(UtmBuilder, "app__utm-builder"),
  "utm-builder",
);
