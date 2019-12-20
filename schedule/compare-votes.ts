import db from "../database/database"

const compareVotes = async () => {

    Promise.all([
        db.client.query(`
            SELECT id FROM stories
        `),
        db.client.query(`
            SELECT v.fragment, n.story, n.content, n.author
            FROM votes v
            JOIN new_fragments n ON n.id = v.fragment
        `)
    ]).then( async response => {

        for(let {id} of response[0].rows) {
            let filtred = response[1].rows.filter( f => f.story === id );
            if(filtred.length) {

                let fCount:any = {};

                for(let f of filtred) {
                    if(!fCount[f.fragment]) {
                        fCount[f.fragment] = 1;
                    } else  {
                        fCount[f.fragment] ++;
                    }
                }

                let max = '';
                let maxValue = 0;

                for(let key in fCount) {
                    if(fCount[key] > maxValue) {
                        maxValue = fCount[key];
                        max = key;
                    }
                }
                const newFragment = filtred[filtred.findIndex( f => f.fragment === parseInt(max))]
                
                try {
                    const response = await db.client.query(`
                        SELECT pos_num FROM fragments WHERE story = $1 ORDER BY id DESC LIMIT 1
                    `, [id]);

                    let posNum = 1;
                    if(response.rows.length) {
                        posNum = parseInt(response.rows[0]['pos_num']) + 1;
                    }

                    try {
                        await db.client.query(`
                            INSERT INTO fragments 
                            (content, pos_num, pub_date, author, story) 
                            VALUES ($1, $2, $3, $4, $5)
                        `, [
                            newFragment.content,
                            posNum,
                            new Date().toISOString().slice(0, 19).replace('T', ' '),
                            newFragment.author,
                            id
                        ]);
                    } catch (err) {
                        console.log(err);
                    }
                    
                } catch (err) {
                    console.log(err);
                }
            }
        }

        //clear db

        await db.client.query(`
            TRUNCATE TABLE new_fragments CASCADE
        `);

    })
    .catch( err => {
        console.log(err);
    });

}

export default compareVotes;