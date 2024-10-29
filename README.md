# Pera Challenge

## Introduction

Welcome to the **Pera Challenge**! Pera is the leading gateway for Algorand projects, providing essential tools and libraries for developers. This challenge simulates real-world scenarios in decentralized application (dApp) development using [Pera Connect](https://github.com/perawallet/connect) —a library designed to simplify wallet integration and blockchain interactions.

## Objective

Build a simple web application using your favorite web framework (React, Vue, or any other) that:

- Connects to a user's Algorand address using Pera Connect.
- Handles transactions and displays verified assets.
- Provides a seamless and user-friendly experience.

## Challenge Steps

### Step 1: Connect the Wallet

- **Implement "Connect with Pera" Button:**
  - Add a button labeled **"Connect with Pera"** to your dApp.
  - Upon clicking, initiate the wallet connection using Pera Connect.
- **Handle Multiple Accounts:**
  - Pera Connect may return multiple accounts, if the user selects.
  - If multiple accounts are returned, prompt the user to select one.
  - Display the selected account address on the screen.
- **Network Compatibility:**
  - Ensure your application can connect with both **Testnet** and **Mainnet**.
  - Provide an option for users to switch between networks.

### Step 2: Implement Payment Transaction

- **"Donate 1 ALGO" Feature:**
  - Add a button labeled **"Donate 1 ALGO"**.
  - When clicked, prompt the user to sign a transaction sending **1 ALGO** to your account.
- **Transaction Handling:**
  - Provide feedback on the transaction status (e.g., pending, confirmed, failed).
  - Handle errors gracefully and inform the user accordingly.

### Step 3: Display Verified Assets

- **Fetch and List Verified Assets:**
  - Use Pera's [Public API](https://docs.perawallet.app/references/public-api) to retrieve a list of all available verified assets.
  - Display the assets in a user-friendly list, including their logos and names.
 
### Step 4: Asset Opt-In Functionality

- **Opt-In to Assets:**
  - When a user clicks on an asset from the list, initiate an opt-in transaction for that asset.
  - Prompt the user to sign the opt-in transaction via Pera Connect.
- **Confirmation and Feedback:**
  - Confirm to the user when the opt-in is successful.
  - Display any errors if the opt-in fails.

---

## Optional Enhancements

*For participants looking to go the extra mile, consider implementing the following feature, which requires a basic backend service:*

- **Atomic Swap Engine:**
  - Create a minimal clone of belowed https://atomixwap.xyz. This will be a good chance to understand the hidden details and complexities creating a real-life blockchain application.

---

**SUBMISSIONS SHOULD BE A PR FOR THIS REPO**

---

## Resources
- [Pera Developer Docs](https://docs.perawallet.app)
- [Pera Connect Documentation](https://github.com/perawallet/connect)
- [Pera Public API Documentation](https://docs.perawallet.app/references/public-api)
- [Algorand Developer Portal](https://developer.algorand.org/)
- [Algorand JavaScript SDK](https://github.com/algorand/js-algorand-sdk)

---

## Evaluation Criteria

Your submission will be evaluated based on:

- **Functionality:**
  - Does the application meet all the required steps?
  - Are optional enhancements implemented?
- **Code Quality:**
  - Is the code clean, well-organized, and commented?
  - Are best practices followed?
- **User Experience (UX):**
  - Is the application intuitive and easy to use?
  - Does it handle errors gracefully?
- **Creativity and Innovation:**
  - Any unique features or improvements beyond the requirements.
- **Technical Implementation:**
  - Efficient use of APIs and handling of asynchronous operations.
  - Security considerations (e.g., handling sensitive data appropriately).
