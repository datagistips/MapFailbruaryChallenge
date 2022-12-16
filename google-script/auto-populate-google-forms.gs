// This automatically creates a Google form from the categories listed here : https://raw.githubusercontent.com/datagistips/30DayMapFailChallenge/main/README.md
// The Form is a Gridded Form with ?, ??, ??? categories

function myFunction() {
  var response = UrlFetchApp.fetch("https://raw.githubusercontent.com/datagistips/30DayMapFailChallenge/main/README.md"); // get feed
  
  //for(i in response) {
  //  Logger.log(i + ": " + response[i]);
  //}

  var r = response.getContentText(); // Get as text

  var lines = r.split(/\r?\n/); // Split at break returns
  // Logger.log(lines);

  // Get items (categories)
  items = [];
  for(var i = 0 ; i < lines.length; i++) {
    //Logger.log(is_ok(lines[i]))
    // is_ok means numerated cat.
    if(is_ok(lines[i])) {
      items.push(reformat(lines[i]))
    }
  }

  items = items.sort() // Alphabetically sort
  Logger.log(items.length + ' ideas !')
  // Logger.log(items)

  createTheForm(items) // Create the form
}

function createTheForm(items) {
  // Form : name, title, desc.
  var form = FormApp.create("MapFailbruaryChallenge")  
      .setTitle("#MapFailbruaryChallenge ?????????")
      .setDescription("Participate to the selection of 28 categories that will help revealing the worst cartographers in the world - Feb. 2023")
    
    // Grid Item
    var item = form.addGridItem();
    item.setTitle("How do you ? each category ? (No response means ??)")
      .setRows(items)
      .setColumns(['I like it ?', 'I love it ???']);
}

function is_ok(myText) {
  var res = myText.match('^[0-9].+ .*$'); // Means num. cat., ex. '11. Worst Colors'
  //Logger.log(res != null)
  return(res != null)
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function reformat(myText) {
  var res = myText.replace(/^[0-9]+./, '');
  var res = res.trim()
  var res = capitalizeFirstLetter(res)
  //Logger.log(res)
  return(res)
}
