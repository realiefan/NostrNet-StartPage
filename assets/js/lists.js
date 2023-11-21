document.addEventListener("DOMContentLoaded", function () {
  // Load links from localStorage
  loadLinks();

  // Attach event listener for toggleDeleteButtons
  document
    .getElementById("toggleDeleteButton")
    .addEventListener("click", toggleDeleteButtons);
});

function openLinkAddingDialog() {
  document.getElementById("linkAddingDialog").showModal();
}

function closeLinkAddingDialog() {
  document.getElementById("linkAddingDialog").close();
}

function addLink() {
  var title = document.getElementById("newLinkTitle").value;
  var url = document.getElementById("newLinkURL").value;

  if (title && url) {
    var linkContainer = document.getElementById("linksContainer");

    // Create a new link container
    var linkDiv = document.createElement("div");
    linkDiv.className = "link-container";

    // Create a new link button element
    var linkButton = document.createElement("button");
    linkButton.textContent = title;

    // Create a delete button element
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.className = "delete-button"; // Initially hidden

    // Save link data to localStorage
    var links = JSON.parse(localStorage.getItem("links")) || [];
    links.push({ title: title, url: url });
    localStorage.setItem("links", JSON.stringify(links));

    // Add click event to open the link in a new tab
    linkButton.onclick = function () {
      window.location.href = url;
    };

    // Add click event to delete the link
    deleteButton.onclick = function () {
      // Remove link from localStorage
      links = links.filter((l) => !(l.title === title && l.url === url));
      localStorage.setItem("links", JSON.stringify(links));

      // Remove link container from the DOM
      linkDiv.remove();
    };

    // Append link elements to the link container
    linkDiv.appendChild(linkButton);
    linkDiv.appendChild(deleteButton);

    // Append the link container to the container
    linkContainer.appendChild(linkDiv);

    // Clear input fields
    document.getElementById("newLinkTitle").value = "";
    document.getElementById("newLinkURL").value = "";

    // Close the modal
    closeLinkAddingDialog();
  } else {
    alert("Please enter both link title and URL");
  }
}

function loadLinks() {
  var linkContainer = document.getElementById("linksContainer");
  var links = JSON.parse(localStorage.getItem("links")) || [];

  links.forEach(function (link) {
    // Create a new link container
    var linkDiv = document.createElement("div");
    linkDiv.className = "link-container";

    // Create a new link button element
    var linkButton = document.createElement("button");
    linkButton.textContent = link.title;

    // Create a delete button element
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.className = "delete-button"; // Initially hidden

    // Add click event to open the link in a new tab
    linkButton.onclick = function () {
      window.location.href = url;
    };

    // Add click event to delete the link
    deleteButton.onclick = function () {
      // Remove link from localStorage
      links = links.filter(
        (l) => !(l.title === link.title && l.url === link.url)
      );
      localStorage.setItem("links", JSON.stringify(links));

      // Remove link container from the DOM
      linkDiv.remove();
    };

    // Append link elements to the link container
    linkDiv.appendChild(linkButton);
    linkDiv.appendChild(deleteButton);

    // Append the link container to the container
    linkContainer.appendChild(linkDiv);
  });
}

function toggleDeleteButtons() {
  // Toggle the visibility of delete buttons
  var deleteButtons = document.querySelectorAll(".delete-button");
  deleteButtons.forEach(function (button) {
    button.classList.toggle("hidden-button");
  });
}
function goHome() {
  // Change the URL to the desired home link
  var homeLink = "https://web.nostrnet.work";
  window.location.href = homeLink;
}
