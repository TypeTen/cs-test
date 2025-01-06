// Mocked API response/data
const stub = [
  {
    name: "smss.exe",
    device: "Mario",
    path: "\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe",
    status: "scheduled",
  },
  {
    name: "netsh.exe",
    device: "Luigi",
    path: "\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe",
    status: "available",
  },
  {
    name: "uxtheme.dll",
    device: "Peach",
    path: "\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll",
    status: "available",
  },
  {
    name: "aries.sys",
    device: "Daisy",
    path: "\\Device\\HarddiskVolume1\\Windows\\System32\\aries.sys",
    status: "scheduled",
  },
  {
    name: "cryptbase.dll",
    device: "Yoshi",
    path: "\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll",
    status: "scheduled",
  },
  {
    name: "7za.exe",
    device: "Toad",
    path: "\\Device\\HarddiskVolume1\\temp\\7za.exe",
    status: "scheduled"
  },
];

/**
 * @desc A function to capitalise the first letter of a string.
 * @param {string} string - The string to capitalise.
 */
const capitaliseString = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 * @desc A function to generate a checkbox element.
 * @param {string} name - The name of the checkbox.
 * @param {string} status - The status of the checkbox.
 * @param {string} path - The path of the checkbox.
 * @param {string} device - The device of the checkbox.
 * @returns {HTMLElement} - The checkbox element.
 * @example
 * const checkbox = generateCheckbox('smss.exe', 'available', '\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe', 'Mario');
 */
const generateCheckbox = (name, status = undefined, path = undefined, device = undefined) => {
  // Container for checkbox, label, and checkmark
  const checkboxContainer = document.createElement('span');
  checkboxContainer.classList.add('checkbox-container');

  // Checkbox proper
  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.id = name.replace('.', '-');
  checkbox.classList.add('checkbox');
  checkbox.dataset.name = name;
  if (path !== undefined) checkbox.dataset.path = path;
  if (device !== undefined) checkbox.dataset.device = device;
  if (status !== 'available' && status !== undefined) checkbox.setAttribute('disabled', true);

  // Checkbox label
  const label = document.createElement('label');
  label.classList.add('checkbox-label');
  if (status) {
    label.classList.add('full-width');
  }
  label.htmlFor = name.replace('.', '-');
  if (!status) {
    label.id = 'select-all-label';
    label.innerText = 'None Selected';
  }

  // Checkbox checkmark
  const span = document.createElement('span');
  span.classList.add('checkbox-check');

  // Append them all
  checkboxContainer.appendChild(checkbox);
  checkboxContainer.appendChild(label);
  checkboxContainer.appendChild(span);

  // Return the container
  return checkboxContainer;
};

/**
 * @desc A function to generate the select all checkbox.
 */
const generateSelectAll = () => {
  const gridHeader = document.getElementById('multi-select__head');
  const checkboxContainer = generateCheckbox('select-all');

  gridHeader.insertBefore(checkboxContainer, gridHeader.firstChild);
};

/**
 * @desc A function to generate the grid headers.
 */
const generateGridHeaders = () => {
  // Get the grid container
  const gridContainer = document.getElementById("multi-select__grid");

  // Assume there's always a checkbox column and create it
  const checkboxColumn = document.createElement('span');
  checkboxColumn.classList.add('multi-select__header');
  checkboxColumn.innerText = '';
  gridContainer.appendChild(checkboxColumn);

  // Create the loop for the columns
  Object.keys(stub[0]).forEach((key, i) => {
    const column = document.createElement('span');
    column.classList.add('multi-select__header');
    column.innerText = capitaliseString(key);
    gridContainer.appendChild(column);
  });
};

/**
 * @desc A function to generate the grid rows.
 */
const generateGridRows = () => {
  const gridContainer = document.getElementById("multi-select__grid");
  
  stub.forEach((item) => {
    const checkboxContainer = generateCheckbox(item.name, item.status, item.path, item.device);

    const nameColumn = document.createElement('span');
    nameColumn.innerText = item.name;

    const deviceColumn = document.createElement('span');
    deviceColumn.innerText = capitaliseString(item.device);

    const pathColumn = document.createElement('span');
    pathColumn.classList.add('pathname');
    pathColumn.id = `${item.name.replace('.', '-')}-path`;
    pathColumn.innerText = capitaliseString(item.path);

    const statusColumn = document.createElement('span');
    statusColumn.dataset.availability = item.status;
    statusColumn.innerText = capitaliseString(item.status);

    gridContainer.appendChild(checkboxContainer);
    gridContainer.appendChild(nameColumn);
    gridContainer.appendChild(deviceColumn);
    gridContainer.appendChild(pathColumn);
    gridContainer.appendChild(statusColumn);
  });
};

/**
 * @desc A function to add a class to the select all checkbox if some but not all checkboxes are selected.
 * @param {HTMLElement} selectAll - The select all checkbox.
 * @param {boolean} doWeAdd - Whether or not to add the class.
 */
const selectAllPartialAdder = (selectAll, doWeAdd) => {
  if (doWeAdd) {
    selectAll.classList.add('partial');
  } else {
    selectAll.classList.remove('partial');
  }
};

/**
 * @desc A function to update the select all label based on the number of checkboxes selected.
 * @param {HTMLElement} selectAllLabel - The select all label.
 * @param {NodeList} checkboxes - The checkboxes.
 */
const selectAllLabelComposer = (selectAllLabel, checkboxes) => {
  const checkedCount = checkboxes.filter(checkbox => checkbox.checked).length;
  if (checkedCount > 0) {
    selectAllLabel.innerText = `Selected ${checkedCount}`;
  } else {
    selectAllLabel.innerText = 'None Selected';
  }
};

/**
 * @desc A function to add event listeners to the page elements.
 */
const listeners = () => {
  const checkboxes = document.querySelectorAll('.checkbox:not(#select-all):not([disabled])');
  const checkboxesArray = Array.from(checkboxes);
  const selectAll = document.getElementById('select-all');
  const selectAllLabel = document.getElementById('select-all-label');
  const button = document.getElementById('download-button');

  selectAll.addEventListener('click', () => {
    checkboxes.forEach(checkbox => {
      if (checkbox.disabled) {
        return;
      }

      if (selectAll.checked) {
        checkbox.checked = true;
      } else {  
        checkbox.checked = false;
      }
    });

    selectAllPartialAdder(selectAll, (checkboxesArray.some(checkbox => checkbox.checked) && !checkboxesArray.every(checkbox => checkbox.checked)));
    
    selectAllLabelComposer(selectAllLabel, checkboxesArray);
  });

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('click', () => {
      selectAll.checked = checkboxesArray.every(checkbox => checkbox.checked);

      selectAllPartialAdder(selectAll, (checkboxesArray.some(checkbox => checkbox.checked) && !checkboxesArray.every(checkbox => checkbox.checked)));

      selectAllLabelComposer(selectAllLabel, checkboxesArray);
    });
  });

  button.addEventListener('click', () => {
    const checkedLabels = checkboxesArray
      .filter(checkbox => checkbox.checked)
      .map(checkbox => {
        return `${checkbox.dataset.device}:\n${checkbox.dataset.path}`;
      });

    if (checkedLabels.length === 0) {
      alert('No files selected');
      return;
    }

    alert(checkedLabels.join('\n\n '));
  });
};

generateSelectAll();
generateGridHeaders();
generateGridRows();
listeners();
