
# Karmalicity-Assistant
A Karmalicity viewing assistant for autonomous point generation.

### Features
- FREE!
- No Ads
- Automated process for completing views
- Easy One-Click startup
- Process personal IMDb page listings
- Process film IMDb running time listings
- Start a pause timer for when there are no valid listings
- Get alerts when the daily limit is reached
- Automatic Updates via [Chrome Web Store](https://chrome.google.com/webstore/detail/karmalicity-assistant/ibngaopmmijfjgepgcoaidcgjcflffpd?hl=en-US)

### Future Updates
- Ability to process YouTube video listings.
- Animate the browser icon during running process.
- Allow the program to function as intended on slower connections.  

### Testing
The directory holding the manifest file can be added as an extension in developer mode in its current state.

1. Open the Extension Management page by navigating to `chrome://extensions` in the URL.
 - The Extension Management page can also be opened by clicking on the Chrome menu, hovering over More Tools then selecting Extensions.
2. Enable Developer Mode by clicking the toggle switch next to Developer mode.
3. Click the LOAD UNPACKED button and select the extension directory.  
Once the extension is loaded, all you have to do is click on the little icon.

![](https://developer.chrome.com/static/images/get_started/load_extension.png)

4. Log in to your Karmalicity account.
5. OPTIONAL: Change the listing types to "IMDb View (Person)" only.  

![Imgur](https://i.imgur.com/SjX7YuB.jpg)

This will streamline view count completion if there are other listing types that are worth higher points than IMDb listings. As of October 4th, 2018, the **master** branch will only work on personal pages but will still *open* title pages if enabled.  This was done to push a working version without unnecessary code. Title functionality will continued to be worked on in the **dev** branch. 
> Note: If you are not logged into the service (ei new browser session), the extension will remind you to log in.

### Errors
If you encounter any errors or the extension is not working, utilise the console.  You can open the console via Chromes hotbar menu, or by pressing `CTRL + SHIFT + I`.  Information needed should be printed there; such as *"The developer needs to add more types"*.  Keep note of which credit Karmalicity was requesting, and add it to the getTargetId() function.
