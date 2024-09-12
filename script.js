var URL_DATA = '/students.json';

var getJSON = function (url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        var status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};

let container = document.getElementById('Scoreboard_body');

getJSON(URL_DATA,
    function (err, data) {
        if (err !== null) {
            alert('Something went wrong: ' + err);
        } else {
            
            data.sort((a,b)=>{
                let t1 = 0;
                a.marks.forEach(m => {
                    t1 += m;
                });
                let t2 = 0;
                b.marks.forEach(m => {
                    t2 += m;
                });

                return t2 - t1;
            });

            let i = 0;
            let lst = 10000000000;
            data.forEach(element => {
                let marks = element.marks;
                let total = 0;
                marks.forEach(m => {
                    total += m;
                });
                if(total < lst){
                    i++;
                    lst = total;
                }
                container.innerHTML += `
        <tr data-user="arn" class="user">
                        <td class="sel"><br /></td>
                        <td class="rank">${i}</td>
                        <td colspan="10" class="f_name">${element.first}</td>
                        <td colspan="10" class="l_name">${element.last}</td>
                        <td colspan="3" data-task="equal" data-sort_key="t_equal" class="score task score_100">${marks[0]}</td>
                        <td colspan="3" data-task="mazes" data-sort_key="t_mazes" class="score task score_100">${marks[1]}</td>
                        <td colspan="3" data-task="multihop" data-sort_key="t_multihop" class="score task score_100">${marks[2]}</td>
                        <td colspan="3" data-task="trees" data-sort_key="t_trees" class="score task score_100">${marks[3]}</td>
                        <td colspan="4" data-contest="weoi" data-sort_key="c_weoi" class="score contest score_100">${marks[4]}</td>
                        <td colspan="5" data-sort_key="global" class="score global score_100 sort_key">${total}</td>
        </tr>
        `
                

            });

        }
    });