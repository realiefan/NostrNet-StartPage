document.addEventListener("DOMContentLoaded", function () {
  // Load links from localStorage
  loadLinks();

  // Move the "Add Link" button to the end of the linksContainer
  document
    .getElementById("linksContainer")
    .appendChild(document.getElementById("addLinkButton"));
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
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-button";

    // Save link data to localStorage
    var links = JSON.parse(localStorage.getItem("links")) || [];
    links.push({ title: title, url: url });
    localStorage.setItem("links", JSON.stringify(links));

    // Add click event to open the link in a new tab
    linkButton.onclick = function () {
      window.open(url, "_blank");
    };

    // Add click event to delete the link
    deleteButton.onclick = function () {
      // Remove link from localStorage
      links = links.filter(
        (link) => !(link.title === title && link.url === url)
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
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-button";

    // Add click event to open the link in a new tab
    linkButton.onclick = function () {
      window.open(link.url, "_blank");
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
