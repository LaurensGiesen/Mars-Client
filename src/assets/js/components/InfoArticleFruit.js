//h3 was originally <h3>Fruits<h3>
const InfoArticleFruit = {
    name: "info article fruit",
    template:
        `
          <h3 class="fruit">Fruit</h3>
          <template v-for="fruit in crops">
            <article>
              <h4>{{ fruit }}</h4>
              <h5>Planting</h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores at culpa cupiditate delectus
                dolores ducimus et impedit minima perspiciatis praesentium! A adipisci eligendi harum laboriosam libero
                modi quisquam tempora veritatis?</p>
              <h5>Maintenance</h5>
              <p class="maintenance">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquam animi cumque
                dolore doloribus ducimus facilis id incidunt iure labore mollitia quos ratione, repellendus repudiandae
                sed soluta sunt, totam voluptate.</p>
            </article>
            <hr>
          </template>
        `
    ,
    data() {
        return {
            crops:
                ["Apples", "Bananas", "Grapes"]
        }
    }
}

