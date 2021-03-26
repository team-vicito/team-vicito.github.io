const abstractifyName = (objectName) => {
  switch (objectName) {
    case "RadVL":
    case "RadVR":
    case "RadHL":
    case "RadHR":
      return "Rad";
    case "FlgVM":
    case "FlgVMS":
      return "FlgVM"
    case "FlgVL":
    case "FlgVR":
      return "FlgV"
    case "FlgHL":
    case "FlgHR":
      return "FlgH";
    case "FeV":
    case "FeH":
    case "TehV":
    case "TehH":
      return "Fe";
    case "SkML":
    case "SkMR":
    case "NmcL":
    case "NmcR":
      return "SkM";
    case "SkHL":
    case "SkHR":
      return "SkH";
    case "LogoL":
    case "LogoR":
      return "Chassis"
    default:
      return objectName;
  }
}

let json;

const loadInformation = () => {
  const _xobj = new XMLHttpRequest();

  _xobj.overrideMimeType("application/json");
  _xobj.open("GET", "assets/details/partInformation.json", true);
  _xobj.onreadystatechange = () => {
    if (_xobj.readyState == 4 && _xobj.status == "200") {
      json = JSON.parse(_xobj.responseText);
    }
  };

  _xobj.send(null);
}

const showDetailsAbout = (objectName) => {
  const details = document.querySelector(".details");

  details.innerHTML = json[abstractifyName(objectName)];
}

loadInformation();
