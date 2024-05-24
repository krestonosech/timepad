<template>
  <div class="body">
  <footer class="footer">
    <div class="footer__top">
      <div class="footer__section">
        <h4>Компания</h4>
        <ul>
          <li><a href="#">Добавь ченить</a></li>
          <li><a href="#">Добавь ченить</a></li>
          <li><a href="#">Добавь ченить</a></li>
          <li><a href="#">Добавь ченить</a></li>
        </ul>
      </div>
      <div class="footer__section">
        <h4>Помощь</h4>
        <ul>
          <li><a href="#">Добавь ченить</a></li>
          <li><a href="#">Добавь ченить Добавь ченить Добавь ченить</a></li>
          <li><a href="#">Добавь ченить Добавь ченить</a></li>
          <li><a href="#">Добавь ченить Добавь ченить</a></li>
        </ul>
      </div>
      <div class="footer__section">
        <h4>Социальные сети</h4>
        <ul class="footer__socials">
          <li><a href="#"><span class="mdi mdi-facebook"></span> Добавь ченить</a></li>
          <li><a href="#"><span class="mdi mdi-twitter"></span> Добавь ченить</a></li>
          <li><a href="#"><span class="mdi mdi-instagram"></span> Добавь ченить</a></li>
          <li><a href="#"><span class="mdi mdi-linkedin"></span> Добавь ченить</a></li>
        </ul>
      </div>
    </div>
    <div class="footer__bottom">
      <p>&copy; 2024 Timepad. Все права защищены.</p>
    </div>
  </footer>
</div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
body {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.footer {
  background-color: #333;
  color: #fff;
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0;
  margin: 0;
  bottom: 0;
  position: sticky;

  &__top {
    display: flex;
    justify-content: space-around;
    width: 100%;
    max-width: 1200px;
    margin-bottom: 20px;

    .footer__section {
      flex: 1;
      padding: 10px;

      h4 {
        font-size: 18px;
        margin-bottom: 10px;
      }

      ul {
        list-style: none;
        padding: 0;

        li {
          margin-bottom: 8px;

          a {
            color: #fff;
            text-decoration: none;
            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
    }
  }

  &__socials {
    display: flex;
    flex-direction: column;

    li {
      display: flex;
      align-items: center;

      a {
        display: flex;
        align-items: center;

        .mdi {
          margin-right: 8px;
        }
      }
    }
  }

  &__bottom {
    text-align: center;
    border-top: 1px solid #444;
    padding-top: 10px;
    width: 100%;

    p {
      margin: 0;
    }
  }
}
</style>
