let voterLog = [];

if (localStorage.getItem("voterLog")) {
  voterLog = JSON.parse(localStorage.getItem("voterLog"));
} 

let v = 0;
    let c1 = 0, c2 = 0, c3 = 0, c4 = 0;
    let g1 = 0, g2 = 0;

    // Event listeners
    document.getElementById("b1").addEventListener("click", vote);
    document.getElementById("b2").addEventListener("click", vote);
    document.getElementById("b3").addEventListener("click", vote);
    document.getElementById("b4").addEventListener("click", vote);
    document.getElementById("g1").addEventListener("click", votee);
    document.getElementById("g2").addEventListener("click", votee);
    document.getElementById("show").addEventListener("click", Show);

    function vote(event1) {
       const clickedId = event1.currentTarget.id;
      
      document.getElementById("b1").disabled = true;
      document.getElementById("b2").disabled = true;
      document.getElementById("b3").disabled = true;
      document.getElementById("b4").disabled = true;
      window.scrollTo({
          top: 450,
          behavior: 'smooth' 
      });

      if (clickedId === "b1") { c1++; }
      else if (clickedId === "b2") { c2++; }
      else if (clickedId === "b3") { c3++; }
      else if (clickedId === "b4") { c4++; }
       localStorage.setItem("voterLog", JSON.stringify(voterLog));

      document.getElementById("c1").textContent = "Devraj Dalal = " + c1;
      document.getElementById("c2").textContent = "Harshit Mittal = " + c2;
      document.getElementById("c3").textContent = "Adarsh = " + c3;
      document.getElementById("c4").textContent = "Shubham Sharma = " + c4;

      setTimeout(function () {
        showMessage("Vote for Head Girl");
       
      }, 100);
    }

    function votee(event2) {
      v++;
     showMessage("You voted successfully!");
     const clicked = event2.currentTarget.id;
      document.getElementById("g1").disabled = true;
      document.getElementById("g2").disabled = true;

      if (clicked === "g1") { g1++; }
      else if (clicked === "g2") { g2++; }
       localStorage.setItem("voterLog", JSON.stringify(voterLog));

     
      document.getElementById("voteCount").textContent = v;
      document.getElementById("k1").textContent = "Ariha = " + g1;
      document.getElementById("k2").textContent = "Bhumi = " + g2;

      setTimeout(function () {
        window.scrollTo({
          top: 0,
          behavior: 'smooth' // Smooth scroll
        });
        
        
      
        
        alert("Next Voter can vote now");
        resetButtons();
      }, 200);
    }

    function Show() {
      document.getElementById("c1").style.visibility = 'visible';
      document.getElementById("c2").style.visibility = 'visible';
      document.getElementById("c3").style.visibility = 'visible';
      document.getElementById("c4").style.visibility = 'visible';
      document.getElementById("k1").style.visibility = 'visible';
      document.getElementById("k2").style.visibility = 'visible';
    }

    function resetButtons() {
      document.getElementById("b1").disabled = false;
      document.getElementById("b2").disabled = false;
      document.getElementById("b3").disabled = false;
      document.getElementById("b4").disabled = false;
      document.getElementById("g1").disabled = false;
      document.getElementById("g2").disabled = false;
    }
function exportVotesCSV() {
  const results = [
    ['Position', 'Candidate', 'Votes'],
    ['Head Boy', 'Boy 1', c1],
    ['Head Boy', 'Boy 2', c2],
    ['Head Boy', 'Boy 3', c3],
    ['Head Boy', 'Boy 4', c4],
    ['Head Girl', 'Girl 1', g1],
    ['Head Girl', 'Girl 2', g2],
  ];

  let csv = "data:text/csv;charset=utf-8," 
          + results.map(row => row.join(",")).join("\n");

  const encodedUri = encodeURI(csv);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "voting_results.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
function exportVoterLog() {
  const data = localStorage.getItem("voterLog");
  if (!data) {
    alert("No saved votes found.");
    return;
  }

  const voterLog = JSON.parse(data);
  const rows = [['Voter Name', 'Position', 'Voted For'],
    ...voterLog.map(entry => [entry.name, entry.position, entry.votedFor])
  ];
  const csv = "data:text/csv;charset=utf-8," + rows.map(r => r.join(",")).join("\n");

  const link = document.createElement("a");
  link.setAttribute("href", encodeURI(csv));
  link.setAttribute("download", "voting_backup.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
function showMessage(msg, duration = 1000) {
  const box = document.getElementById('messageBox');
  box.textContent = msg;
  box.style.display = 'block';

  setTimeout(() => {
    box.style.display = 'none';
  }, duration);
}