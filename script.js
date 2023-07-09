const search = document.querySelector(".searchandoption input");
const select = document.querySelector("select");
const details = document.querySelector(".details");
async function getdata(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    select.addEventListener("change", (e) => {
      let sear = search.value;
      let target = e.target.value;
      let result = data.find((item) => item.word === sear.toLowerCase());
      setlocatstorage = () => {
        let arraywords = [];
        arraywords = JSON.parse(localStorage.getItem("arraylist"))
          ? JSON.parse(localStorage.getItem("arraylist"))
          : [];

        if (arraywords.some((w) => w.word === result.word)) {
          alert("this word already in favorites list");
      checked = false;
          return;
        } else {
          arraywords.push(result);
          localStorage.setItem("arraylist", JSON.stringify(arraywords));
        }
      };

      if (search.value === "") {
        alert("please Enter a word");
        return;
      }
      if (result) {
        if (target !== "") {
          if (target === "definition") {
            details.innerHTML = `<p class="Definition">
        <span>Definition</span>: <br />
       ${result.definition}.
      </p><div class="chechlist">
        <p><span>favorites</span></p>
        <div class="check">
          <input type="checkbox" id="chechbox"  value="jsondata" onclick="ischecked()" />
        </div>
      </div>`;
          } else if (target === "examples") {
            details.innerHTML = "";
            const examplesData = result.examples.join("<br>");
            // let examplesdata = element

            details.innerHTML += ` <p class="examples">
        <span>examples</span> <br />
       ${examplesData}
      </p><div class="chechlist">
        <p><span>favorites</span></p>
        <div class="check">
          <input type="checkbox" id="chechbox" value="jsondata" onclick="ischecked()" />
        </div>
      </div>`;
          } else if (target === "synonyms") {
            details.innerHTML = "";
            const synonymsData = result.synonyms.join(",");
            // let examplesdata = element

            details.innerHTML += `  <p class="synoms">
        <span>synoms</span><br />
      ${synonymsData}
      </p><div class="chechlist">
        <p><span>favorites</span></p>
        <div class="check">
          <input type="checkbox" id="chechbox"  value="jsondata" onclick="ischecked()" />
        </div>
      </div>`;
          } else if (target === "antonyms") {
            details.innerHTML = "";
            const antonymsData = result.antonyms.join(",");
            // let examplesdata = element

            details.innerHTML += `  <p class="antnoms">
        <span>antynoms</span><br />
${antonymsData}
      </p> <div class="chechlist">
        <p><span>favorites</span></p>
        <div class="check">
          <input type="checkbox" id="chechbox"  value="jsondata" onclick="ischecked()" />
        </div>
      </div>`;
          } else if (target === "All") {
            details.innerHTML = "";
            const antonymsData = result.antonyms.join(",");
            const synonymsData = result.synonyms.join(",");
            const examplesData = result.examples.join("<br>");

            details.innerHTML += `<p class="Definition">
        <span>Definition</span>: <br />
        ${result.definition}.
      </p>

      <p class="examples">
        <span>examples</span> <br />
        ${examplesData}
      </p>
      <p class="synoms">
        <span>synoms</span><br />
        ${synonymsData}
      </p>
      <p class="antnoms">
        <span>antynoms</span><br />
        ${antonymsData}
      </p>
      <div class="chechlist">
        <p><span>favorites</span></p>
        <div class="check">
          <input type="checkbox" id="chechbox"  value="jsondata" onclick="ischecked()"/>
        </div>
      </div>  `;
          }
        }

        ischecked = () => {
          if (document.getElementById("chechbox").checked) {
            setlocatstorage();
          }
        };
      } else {
        alert("No matching word found.");
      }
    });
  } catch (e) {
    console.log(e);
  }
}

getdata("./words.json");