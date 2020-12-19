const InfoArticleVeggies = {
    name: "info article veggies",
    template:
        `
          <h3 class="veggie">Vegetables</h3>
          <template v-for="veggie in crops">
            <article>
              <h4>{{ veggie }}</h4>
              <h5>Planting</h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores at culpa cupiditate delectus
                dolores ducimus et impedit minima perspiciatis praesentium! A adipisci eligendi harum laboriosam libero
                modi quisquam tempora veritatis?</p>
              <h5>Maintenance</h5>
              <p class="maintenance">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquam animi cumque
                dolore doloribus ducimus facilis id incidunt iure labore mollitia quos ratione, repellendus repudiandae
                sed soluta sunt, totam voluptate.</p>
              <hr>
            </article>
          </template>
        `
    ,
    data() {
        return {
            crops:
                ["Tomatoes", "Carrots"]
        }
    }
}
