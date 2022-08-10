function loadUserHome() {
    let homeElement = document.querySelector("#HomeContainer > div.section > div")
    while (homeElement === null) {
        homeElement = document.querySelector("#HomeContainer > div.section > div")
    }
    let waitingCode = `<h1 id="userprofilepictureontopofhomeandgames" style="display: flex; align-items: center; margin-bottom: 0px; height: initial; max-width: 55%;">
<a class="avatar avatar-card-fullbody" style="margin-right: 15px; width: 128px; height: 128px;" href="www.roblox.com/home">
	<span class="avatar-card-link friend-avatar icon-placeholder-avatar-headshot" style="width: 128px; height: 128px;">
		<thumbnail-2d class="avatar-card-image">
			<span class="thumbnail-2d-container">
				<span id="mostPlayedLoadingBar" style="float: right; display: inline-block; width: 130px; height: 25px; visibility: initial !important;margin-right:0px;margin-top:50px;" class="spinner spinner-default"></span>
				<span id="mostPlayedLoadingBar" style="float: right; display: inline-block; width: 130px; height: 25px; visibility: initial !important;margin-right:0px;margin-top:100px;" class="spinner spinner-default"></span>
			</span>
		</thumbnail-2d>
	</span>
</a>
<span id="mostPlayedLoadingBar" style="visibility: initial !important;" class="spinner spinner-default"></span>
</h1>`

    homeElement.innerHTML += waitingCode
    let userImageEl = document.querySelector("#navigation > ul > li:nth-child(1) > a > span > span > img")
    while (userImageEl === null) {
        userImageEl = document.querySelector("#navigation > ul > li:nth-child(1) > a > span > span > img")
    }
    const userImage = userImageEl.src

    const userProfileLinkEl = document.querySelector("#navigation > ul > li:nth-child(1) > a")
    while (userProfileLinkEl === null) {
        userProfileLinkEl = document.querySelector("#navigation > ul > li:nth-child(1) > a")
    }
    const userProfileLink = userProfileLinkEl.href

	const userUsernameEl = document.querySelector("#navigation > ul > li:nth-child(1) > a > div")
	while (userUsernameEl === null) {
        userUsernameEl = document.querySelector("#navigation > ul > li:nth-child(1) > a > div")
    }
	const userUsername = userUsernameEl.innerText
	
    const hasPremium = document.querySelector("#upgrade-now-button")//.textContent == "Premium"
    while (hasPremium === null) {
        hasPremium = document.querySelector("#upgrade-now-button")
    }

    if (userImage == undefined) {
        catchLoadUserHome("Can't get user's avatar image.")
        return
    } else if (userProfileLink == undefined) {
        catchLoadUserHome("Can't get user's profile link.")
        return
    } else if (hasPremium.textContent == undefined) {
        catchLoadUserHome("Can't get user's membership status.")
        return
    } else if (userUsername == undefined) {
        catchLoadUserHome("Can't get user's username.")
        return
    }

    let hasPremiumCode = ``
    if (hasPremium.textContent = "Premium") {
        hasPremiumCode = `<span class="icon-premium-medium" style="margin-right: 10px;"></span>`
    }

    let homeUser = `<h1 style="display: flex; align-items: center; margin-bottom: 0px; height: initial; max-width: 55%;">
                    <a class="avatar avatar-card-fullbody" style="margin-right:15px;width:128px;height:128px;" href="${userProfileLink}">
                        <span class="avatar-card-link friend-avatar icon-placeholder-avatar-headshot" style="width:128px;height:128px;">
                            <thumbnail-2d class="avatar-card-image">
                                <span class="thumbnail-2d-container">
                                    <img src="${userImage}" style="background-color: #d4d4d4;">
                                </span>
                            </thumbnail-2d>
                        </span>
                    </a>
					${hasPremiumCode}
                    <a href="${userProfileLink}" class="user-name-container">${userUsername}</a>
                </h1>`

	setTimeout(function(){
        document.getElementById("userprofilepictureontopofhomeandgames").remove()
		homeElement.innerHTML += homeUser
    }, 2000)
	
	// version check:
	try	{
        let currentVersion = chrome.runtime.getManifest().version
		fetch("https://raw.githubusercontent.com/mstudio45/ReturnRobloxHomeUser/source/version").then((response) => response.text()).then((latestVersion) => {  
			if (latestVersion == undefined) {
				console.log("----------------------- Return Roblox Home User -----------------------\n")
				console.log("Can't check extension version.")
				console.log("----------------------- Return Roblox Home User -----------------------\n")
				return
			};
				
			if (currentVersion != latestVersion) {
				if (window.confirm('Return Roblox Home User:\n  Do you want to download newer version?')) {
					window.open('https://github.com/mstudio45/ReturnRobloxHomeUser/tree/main', '_blank');
				}
			}
		});
    } catch {
        console.log("----------------------- Return Roblox Home User -----------------------\n")
		console.log("Can't check extension version.")
		console.log("----------------------- Return Roblox Home User -----------------------\n")
    }
}
function catchLoadUserHome(error) {
    try {
        document.getElementById("userprofilepictureontopofhomeandgames").remove()
    } catch {}

    let homeElement = document.querySelector("#HomeContainer > div.section > div")
    while (homeElement === null) {
        homeElement = document.querySelector("#HomeContainer > div.section > div")
    }

    let errorCode = `<h1 id="userprofilepictureontopofhomeandgames" style="display: flex; align-items: center; margin-bottom: 0px; height: initial; max-width: 55%;">
<a class="avatar avatar-card-fullbody" style="margin-right: 15px; width: 128px; height: 128px;" href="www.roblox.com/home">
	<span class="avatar-card-link friend-avatar icon-placeholder-avatar-headshot" style="width: 128px; height: 128px;">
		<thumbnail-2d class="avatar-card-image">
			<span class="thumbnail-2d-container">
				<span id="mostPlayedLoadingBar" style="float: right; display: inline-block; width: 130px; height: 25px; visibility: initial !important;margin-right:0px;margin-top:50px;" class="spinner spinner-default"></span>
				<span id="mostPlayedLoadingBar" style="float: right; display: inline-block; width: 130px; height: 25px; visibility: initial !important;margin-right:0px;margin-top:100px;" class="spinner spinner-default"></span>
			</span>
		</thumbnail-2d>
	</span>
</a>
<a href="www.roblox.com/home" class="user-name-container">Error, check Developer Console.</a>
</h1>`

    homeElement.innerHTML += errorCode
    console.log("----------------------- Return Roblox Home User -----------------------\n")
    console.warn(error)
    console.log("----------------------- Return Roblox Home User -----------------------\n")
}

setTimeout(function(){
    try {
        loadUserHome()
    } catch (e) {
        catchLoadUserHome(e)
    }
},1000)