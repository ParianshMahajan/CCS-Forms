import React, { useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import config from '../config';

const TestFile = () => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    try {
      setLoading(true);
        let url=config.apiurl+'/admin/download'

      const response = await axios.get(url, {
        responseType: 'blob', // Specify responseType as 'blob' to handle binary data
      });
      console.log(response.data);
      saveAs(response.data, 'exported_data.csv');

    } catch (error) {
      console.error('Error downloading CSV file:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleDownload} disabled={loading}>
        {loading ? 'Downloading...' : 'Download CSV'}
      </button>
    </div>
  );
};

export default TestFile;