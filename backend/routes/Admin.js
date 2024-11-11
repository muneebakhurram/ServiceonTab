const express = require('express');
const ProviderSignup = require('../models/providersignup');
const path = require('path');
const router = express.Router();
const fs = require('fs');
// Route to fetch pending requests
router.get('/pending-requests', async (req, res) => {
  try {
      const pendingRequests = await ProviderSignup.find({ status: 'pending' });
      res.json(pendingRequests);
  } catch (error) {
      res.status(500).json({ message: "Error fetching requests" });
  }
});

// Admin accepts/rejects the provider signup request
router.post('/accept/:providerId', async (req, res) => {
    const { providerId } = req.params;
    const { isAccepted } = req.body;

    try {
        const provider = await ProviderSignup.findById(providerId);
        if (!provider) {
            return res.status(404).json({ success: false, message: 'Provider not found.' });
        }

        provider.isVerified = isAccepted;
        provider.status = isAccepted ? 'approved' : 'rejected';

        await provider.save();

        res.status(200).json({
            success: true,
            message: isAccepted ? 'Provider accepted.' : 'Provider rejected.',
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get('/api/Admin/download/:type/:requestId', (req, res) => {
  const { type, requestId } = req.params;

  let filePath;
  // Define the file path based on the type (e.g., cnicFront, cnicBack, clearanceCertificate)
  switch (type) {
    case 'cnicFront':
      filePath = `/path/to/files/${requestId}_front.jpg`; // Make sure this path is correct
      break;
    case 'cnicBack':
      filePath = `/path/to/files/${requestId}_back.jpg`; // Make sure this path is correct
      break;
    case 'clearanceCertificate':
      filePath = `/path/to/files/${requestId}_certificate.pdf`; // Make sure this path is correct
      break;
    default:
      return res.status(400).send('Invalid file type');
  }

  // Check if the file exists
  const fs = require('fs');
  if (!fs.existsSync(filePath)) {
    return res.status(404).send('File not found');
  }

  // Set headers to force download
  res.download(filePath, (err) => {
    if (err) {
      console.error('Download error:', err);
      res.status(500).send('File download failed');
    }
  });
});


  

module.exports = router;
