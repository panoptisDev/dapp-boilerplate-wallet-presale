/* styles/Stake.module.css */

.App {
  text-align: center;
  font-family: 'Roboto', sans-serif;
  background: linear-gradient(135deg, #1e1e1e 0%, #004ac9 100%);
  color: #ffffff;
  padding: 40px;
  border-radius: 10px;
  max-width: 600px;
  margin: 0 auto;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
}

.heading {
  font-size: 2.5em;
  margin-bottom: 20px;
  color: #00bbb8;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.accountInfo,
.stakeInfo,
.status {
  margin: 20px 0;
}

.actions {
  margin: 20px 0;
}

.actions button {
  margin: 10px;
  padding: 12px 25px;
  font-size: 1.1em;
  cursor: pointer;
  border: none;
  border-radius: 25px;
  background-color: #01afbf;
  color: #1e1e1e;
  transition: background-color 0.3s, transform 0.3s;
}

.actions button:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}

.actions button:hover:not(:disabled) {
  background-color: #02e8fd;
  transform: scale(1.05);
}

.status {
  font-weight: bold;
  padding: 10px;
  background-color: #2c2c2c;
  border-radius: 5px;
}

.inputClass {
  padding: 10px;
  font-size: 1.2em;
  width: calc(100% - 22px);
  margin-top: 10px;
  border: 2px solid #004ac9;
  border-radius: 5px;
}

.tooltip {
  position: relative;
  display: inline-block;
  cursor: pointer;
  color: #f9d342;
  margin-left: 5px;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 160px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 5px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 125%; /* Adjust the position as per requirement */
  left: 50%;
  margin-left: -80px; /* Adjust the position as per requirement */
  opacity: 0;
  transition: opacity 0.3s;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}