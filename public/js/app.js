// const searchIt = async () => {
//     const searchTerms = document.getElementById("search").value
//     console.log(searchTerms);
//     const questions = await axios.get(`http://localhos:3000/questions/search?question=${searchTerms}`).then(
//         (question) => {
//             return question.data
//         }
//     )
//     console.log(questions);
//     let answers = ``
//     questions.forEach(question => {
//         const { title, subtitle, answered } = question
//         console.log(title, subtitle);
//         const sc = 
//         `
//         ${answered ? '<span class="text-success">Answered</span>' : '<span class="text-muted">Not Answered</span>'}
//         `
//         const ele = `
//         <div class="card mb-2 col-12" key="${question._id}">
//             <div class="card-body">
//                 <h5 class="card-title">Q : ${question.title}</h5>
//                 <p class="card-text">${question.subtitle}</p>
//                 <blockquote class="blockquote mb-0">
//                     <p></p>
//                     <footer class="blockquote-footer">
//                         ${question.by}
//                         |
//                         <cite title="Source Title">${question.newDate.day}-${question.newDate.month}-${question.newDate.year}</cite>
//                     </footer>
//                 </blockquote>
//             </div>
//             <div class="card-footer text-muted text-left">
//                 Views ${question.views} | ${sc}
//             </div> 
//         </div>
//         `
//         answers += ele
//     });
//     console.log(answers);
//     const somthing = document.getElementById("all")
// }