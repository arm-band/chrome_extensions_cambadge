/**
 * cambadge
 *
 * rewrite url of badge in Github Actions
 */

/**
 * cambadgeCampaign: rewrite markdown code in textarea
 *
 * @param {object} DOMBadgeMd
 */
const cambadgeCampaign = (DOMBadgeMd) => {
    if (/^\!\[(.*)\]\((.*)\)$/gi.test(DOMBadgeMd.textContent)) {
        DOMBadgeMd.textContent = `[${DOMBadgeMd.textContent}](${location.href})`;
    }
};

window.addEventListener('load', (e) => {
    // triggered load
    if (/https:\/\/github\.com\/(.*)actions(.*)/gi.test(location.href)) {
        // only github actions page
        const clickItem = document.querySelector('summary[data-test-selector="badge-builder-button"]');
        clickItem.addEventListener('click', (ev) => {
            // triggered click of element:summary[data-test-selector="badge-builder-button"]
            let setIntervalId;
            let DOMBadgeMd;
            function findTargetElement () {
                // watch until find element:#badge-markdown
                DOMBadgeMd = document.querySelector('#badge-markdown');
                if (DOMBadgeMd !== null && DOMBadgeMd !== undefined) {
                    // found
                    clearInterval(setIntervalId);

                    // call function
                    cambadgeCampaign(DOMBadgeMd);
                }
            };
            setIntervalId = setInterval(findTargetElement, 100);
        });
    }
});
