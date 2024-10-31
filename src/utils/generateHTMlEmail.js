export const generateHTMLEmail = (houseslist = []) => {
    return `<!DOCTYPE html>
<html>
<head>
  <title>Novos apartamentos encontrados</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f6f6f6;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      padding-bottom: 20px;
    }
    .content {
      color: #333333;
      line-height: 1.6;
    }
    .text-link {
      display: inline-block;
      font-size: 16px;
      color: #4287f5;
    }
    .button:hover {
      background-color: #0056b3;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Encontramos novos apartamentos!</h1>
    </div>
    <div class="content">
      <p>Achamos novos apartamentos para você dar uma olhada.</p>
      ${houseslist.map((house) => `<a href=${house} class="text-link">${house}</a>`)}
      <p>Atenciosamente,</p>
      <p>Houses Crawler</p>
    </div>
  </div>
</body>
</html>`
}