# WAVES TX CREATOR

## Steps
- Install WaveeKeeper plugin on your browser, create an account
- Launch the [website](https://waves-tx-creator.herokuapp.com/)
- WavesKeeper will ask if you allow website to access it<br/>
![Authenticate web with WavesKeeper](./docs/tut_step_01_auth.png "tutorial")
- Choose `Auth`<br/>
![Authenticate web with WavesKeeper](./docs/tut_step_02_auth.png "tutorial")
- Make sure you have the blue message below. Then choose a Transaction type (eg `ReIssue Transaction`)
![Choose a transaction type](./docs/tut_step_03_select_tx.png "tutorial")
- Make changes to the transaction data as you like. If you're unsure which parameters to change, read the Waves documentation first<br/>
![Edit transaction data](./docs/tut_step_04_edit_tx.png "tutorial")
- Sign the transaction: choose a `Proof Order` (if your AssetScript requires multisig), or leave it 0, then click `SET PROOF`
- WavesKeeper will ask for your confirmation, check the transaction detail and click `Sign` in the lower right<br/>
![Sign tx](./docs/tut_step_05_confirm_sign_tx.png "tutorial")
- Your transaction is signed, now hit `Close` button<br/>
![Sign tx](./docs/tut_step_06_complete_sign_tx.png "tutorial")
- The signed transaction data will appear on the right side. You can choose to `PUBLISH`, or copy the data then pass on to others for signing<br/>
![Sign tx](./docs/tut_step_07_signed_tx.png "tutorial")
- Confirm to broadcast transaction, when broadcasted the transaction is **irreversible**:
![Broadcast tx](./docs/tut_step_08_confirm_broadcast_tx.png "tutorial")
- Wait for the broadcast to finish, you will get message with link to transaction for review
![Success tx](./docs/tut_step_09_tx_success.png "tutorial")
- In case you want to pass the signed transaction data around for multi-signing, copy it then send to your colleague using whateve means you find safe. Then your colleague should use the `IMPORT` function
![Import tx](./docs/tut_step_10_import_tx.png "tutorial")
- Paste the content in the textbox, then choose `IMPORT`
![Import tx](./docs/tut_step_11_import_tx.png "tutorial")
- Now choose a different `Proof Order` and `ADD PROOF`, complete the signing in WavesKeeper
![Import tx](./docs/tut_step_12_add_proof_tx.png "tutorial")
- Repeat the steps until you reach your minimum requirement for multisig, then `PUBLISH` the transaction