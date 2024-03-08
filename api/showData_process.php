<?php
//ファイルの読み込み
require_once "db_connect.php";
require_once "functions.php";
//セッション開始
session_start();

// キーワード検索の処理
$search_keyword = isset($_GET['keyword']) ? $_GET['keyword'] : ''; // GETリクエストからキーワードを取得

// ユーザー情報を取得
$sql = "SELECT * FROM user_info";
// キーワードが入力されている場合、検索条件を追加
if (!empty($search_keyword)) {
    $sql .= " WHERE kanji_name LIKE :keyword OR romaji_name LIKE :keyword OR affiliation LIKE :keyword OR email_address LIKE :keyword";
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(':keyword', "%$search_keyword%", PDO::PARAM_STR);
} else {
    $stmt = $pdo->query($sql);
}
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Your Friends List</title>
    <link rel="stylesheet" href="./showData.css">
</head>
<body class="showData_body" style="background-color: #F0E8F8;">
<div class="navigation">
      <ul>
        <li class="list active">
          <a href="showData_process.php">
            <span class="icon"><ion-icon name="home-outline"></ion-icon></span>
            <span class="title">HOME</span>
          </a>
        </li>
        <li class="list">
          <a href="MyPage_process.php">
            <span class="icon"><ion-icon name="person-circle-outline"></ion-icon></span>
            <span class="title">PROFILE</span>
          </a>
        </li>
        <li class="list">
          <a href="logout.php">
            <span class="icon"
              ><ion-icon name="log-out-outline"></ion-icon
            ></span>
            <span class="title">SIGNOUT</span>
          </a>
        </li>
      </ul>
</div>
<div class="content">
    <div class="serach">
        <form action="" method="GET">
            <input  type="text" name="keyword" placeholder="" style="height: 33px" style="border-radius: 20px;" style="width: 100px;">
            <button type="submit"><ion-icon name="search-outline"></ion-icon></button>
        </form>
    </div>
    <div class="wrapper">
        
        <table class="table_table-bordered">
            <thead>
                <tr>
                    <th style="text-align: center;">Name</th>
                    <th style="text-align: center;">Affiliation</th>
                    <th style="text-align: center;">Email</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach($rows as $row): ?>
                    <tr>
                        <td style="text-align: center;"><?php echo $row['kanji_name'] . " ( " . $row['romaji_name'] . " )"; ?></td>
                        <td style="text-align: center;"><?php echo $row['affiliation']; ?></td>
                        <td style="text-align: center;"><?php echo $row['email_address']; ?></td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</div>


<!-- サイドバーのJS -->
<script>
      const list = document.querySelectorAll(".list");
      console.log(list);
      function activeLink() {
        list.forEach((item) =>
          // console.log(item);
          item.classList.remove("active")
        );
        this.classList.add("active");
      }

      list.forEach((item) => {
        item.addEventListener("click", activeLink);
      });
    </script>

    <!-- アイコンの引用元 -->
    <script
      type="module"
      src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
    ></script>
    <script
      nomodule
      src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
    ></script>
</body>
</html>
