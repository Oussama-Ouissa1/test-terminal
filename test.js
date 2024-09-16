const readline = require('readline');

function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  return new Promise(resolve => rl.question(query, ans => {
    rl.close();
    resolve(ans);
  }));
}
var listeEtudiant = [];


async function showMenu() {
    console.log('\n=== Liste de Tâches ===');
    console.log('1. Ajouter un étudiant');
    console.log('2. Attribuer les notes à un étudiant');
    console.log('3. Afficher la liste des étudiants');
    console.log('4. Calculer la moyenne des notes d’un étudiant');
    console.log('5. Supprimer un étudiant');
    console.log('6. Afficher les détails d’un étudiant');
    console.log('7. Quitter');

    const choice = await askQuestion('Choisissez une option : ');

    switch (choice) {
        case '1':
            await ajouteDesEtudiant();
        break;
        case '2':
            await ajouteDesNote();
        break;
        case '3':
            await aficheLesEtudiant();
        break;
        case '4':
            await calcEtudiant();
        break;
        case '5' :
            await SumpirmEtudiant();
        break;
        case '6':
            await DetailEtudiant();
        break;
        case '7':
            await quitteLesTache();
        return;
        default:
        console.log('Option non valide, veuillez réessayer.');
    }


    async function ajouteDesEtudiant(){
        const name = await askQuestion("Entrer Nom de l'étudiant: ");
        const age = await askQuestion("Entrer age de l'étudiant: ");
        listeEtudiant.push([name, age]);
        console.log("l'étudiant a été bien ajouté");
    };


    async function ajouteDesNote(){
        let lesNotes = [];
        const note = await askQuestion("Entrer le numéro de l'étudiant dans la liste : ");
        for (let i = 0; i < 3; i++ ){
            const ajouteNote = await askQuestion("Entrer la "+ (i+1) +" note de l'étudiant : ");
            lesNotes.push(ajouteNote);
        }
        listeEtudiant[note-1].push(lesNotes);
        console.log("la note de l'étudiant a été bien ajouté");
    };


    async function aficheLesEtudiant(){
        for(let i = 1; i < listeEtudiant.length+1; i++){
            console.log(i +'- ' + listeEtudiant[i-1][0]);
        }
    };


    async function calcEtudiant() {
        let calcNotes = '';
        const nmr = await askQuestion("Entrer le numéro de l'étudiant dans la liste : ");
        calcNotes = (Number(listeEtudiant[nmr-1][2][0]) + Number(listeEtudiant[nmr-1][2][1]) + Number(listeEtudiant[nmr-1][2][2])) / 3;
        console.log("le moyen de l'étudiant "+ listeEtudiant[nmr-1][0] +" est : "+ calcNotes);
    }


    async function SumpirmEtudiant() {
        const suprm = await askQuestion("Entrer le numéro de l'étudiant pour suprimée dans la liste : ");
        listeEtudiant.splice(listeEtudiant[suprm-1], 1);
        console.log("l'étudiant a été bien suprimée !");
    }

    async function DetailEtudiant() {
        const detail = await askQuestion("Entrez le numéro d'étudiant pour voir ses détails : ");
        console.log("Nom : "+ listeEtudiant[detail-1][0]);
        console.log("Age : "+ listeEtudiant[detail-1][1]);
        console.log("Note : "+ listeEtudiant[detail-1][2]);
    }


    showMenu(); // Rappelle la fonction pour réafficher le menu après chaque choix
}

// Démarre le programme
showMenu();

async function quitteLesTache() {
    console.log('Merci de utilisé la liste de tâches. À bientôt !')
};