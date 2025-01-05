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
  { name: "7za.exe", device: "Toad", path: "\\Device\\HarddiskVolume1\\temp\\7za.exe", status: "scheduled" },
];

const tableHeadings = [
  "",
  "Name",
  "Device",
  "Path",
  "Status"
];

const generateCheckbox = (name, status = false) => {
  // Container for checkbox, label, and checkmark
  const checkboxContainer = document.createElement('span');
  checkboxContainer.classList.add('checkbox-container');

  // Checkbox proper
  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.id = name.replace('.', '-');
  checkbox.classList.add('checkbox');

  if (status === 'scheduled') {
    checkbox.setAttribute('disabled', true);
  }

  // Checkbox label
  const label = document.createElement('label');
  label.classList.add('checkbox-label');
  if (status) {
    label.classList.add('full-width');
  }
  label.htmlFor = name.replace('.', '-');
  if (!status) {
    label.id = 'select-all-label';
    label.innerText = 'Select All';
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

const generateSelectAll = () =>{
  // Holy macaroni, this is a lot of code for a simple checkbox
  const gridHeader = document.getElementById('multi-select__head');
  const checkboxContainer = generateCheckbox('select-all', false);

  gridHeader.insertBefore(checkboxContainer, gridHeader.firstChild);
};

const generateGridHeaders = () => {
  const gridContainer = document.getElementById("multi-select__grid");

  const column1 = document.createElement('span');
  column1.innerText = '';

  const column2 = document.createElement('span');
  column2.innerText = 'Name';

  const column3 = document.createElement('span');
  column3.innerText = 'Device';

  const column4 = document.createElement('span');
  column4.innerText = 'Path';

  const column5 = document.createElement('span');
  column5.innerText = 'Status';

  gridContainer.appendChild(column1);
  gridContainer.appendChild(column2);
  gridContainer.appendChild(column3);
  gridContainer.appendChild(column4);
  gridContainer.appendChild(column5);
};

const generateGridRows = () => {
  const gridContainer = document.getElementById("multi-select__grid");
  
  for (let i = 0; i < stub.length; i++) {
    const checkboxContainer = generateCheckbox(stub[i].name, stub[i].status);

    const nameColumn = document.createElement('span');
    nameColumn.innerText = stub[i].name;

    const deviceColumn = document.createElement('span');
    deviceColumn.innerText = stub[i].device;

    const pathColumn = document.createElement('span');
    pathColumn.classList.add('pathname');
    pathColumn.innerText = stub[i].path;

    const statusColumn = document.createElement('span');
    statusColumn.dataset.availability = stub[i].status;
    statusColumn.innerText = stub[i].status;

    gridContainer.appendChild(checkboxContainer);
    gridContainer.appendChild(nameColumn);
    gridContainer.appendChild(deviceColumn);
    gridContainer.appendChild(pathColumn);
    gridContainer.appendChild(statusColumn);
  };
};

const selectAllPartialAdder = (selectAll, doWeAdd) => {
  if (doWeAdd) {
    selectAll.classList.add('partial');
  } else {
    selectAll.classList.remove('partial');
  }
};

const selectAllLabelComposer = (selectAllLabel, checkboxes) => {
  const checkedCount = checkboxes.filter(checkbox => checkbox.checked).length;
  if (checkedCount > 0) {
    selectAllLabel.innerText = `Selected ${checkedCount}`;
  } else {
    selectAllLabel.innerText = 'Select All';
  }
};

const checkboxListener = () => {
  const checkboxes = document.querySelectorAll('.checkbox:not(#select-all):not([disabled])');
  const selectAll = document.getElementById('select-all');
  const selectAllLabel = document.getElementById('select-all-label');

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

    selectAllPartialAdder(selectAll, (Array.from(checkboxes).some(checkbox => checkbox.checked) && !Array.from(checkboxes).every(checkbox => checkbox.checked)));
    
    selectAllLabelComposer(selectAllLabel, Array.from(checkboxes));
  });

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('click', () => {
      selectAll.checked = Array.from(checkboxes).every(checkbox => checkbox.checked);

      selectAllPartialAdder(selectAll, (Array.from(checkboxes).some(checkbox => checkbox.checked) && !Array.from(checkboxes).every(checkbox => checkbox.checked)));

      selectAllLabelComposer(selectAllLabel, Array.from(checkboxes));
    });
  });
};

generateSelectAll();
generateGridHeaders();
generateGridRows();
checkboxListener();
