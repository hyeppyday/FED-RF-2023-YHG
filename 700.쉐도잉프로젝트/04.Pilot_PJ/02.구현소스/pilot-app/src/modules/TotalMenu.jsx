// pilot PJ 전체메뉴 컴포넌트

export function TotalMenu() {
  return (
    <>
      <div class="mbox">
        <video
          src="images/disc2018.mp4"
          loop="loop"
          muted="muted"
          class="bgm"
        ></video>
        <nav class="mlist">
          <dl>
            <dt>
              <a href="sub.html?cat=남성">MEN</a>
            </dt>
            <dd>
              <a href="#">T-SHIRT</a>
            </dd>
            <dd>
              <a href="#">JACKET</a>
            </dd>
            <dd>
              <a href="#">TRAINING WARE</a>
            </dd>
            <dd>
              <a href="#">BEACH WARE</a>
            </dd>
          </dl>
          <dl>
            <dt>
              <a href="sub.html?cat=여성">WOMEN</a>
            </dt>
            <dd>
              <a href="#">T-SHIRT</a>
            </dd>
            <dd>
              <a href="#">JACKET</a>
            </dd>
            <dd>
              <a href="#">TRAINING WARE</a>
            </dd>
            <dd>
              <a href="#">BEACH WARE</a>
            </dd>
          </dl>
          <dl>
            <dt>
              <a href="sub.html?cat=스타일">STYLE</a>
            </dt>
            <dd>
              <a href="#">COLLECTION</a>
            </dd>
            <dd>
              <a href="#">SEASON AD</a>
            </dd>
            <dd>
              <a href="#">STAR &amp; NEWS</a>
            </dd>
            <dd>
              <a href="#">MAIN ITEM</a>
            </dd>
          </dl>
        </nav>
      </div>
    </>
  );
} ////////////// TotalMenu 컴포넌트 ///////////////
