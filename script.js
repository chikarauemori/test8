async function initializeLiff() {
  try {
    await liff.init({ liffId: "2007062923-m2O4KDv3D" });

    if (!liff.isLoggedIn()) {
      liff.login();
    } else {
      const profile = await liff.getProfile();
      const userId = profile.userId;
      localStorage.setItem("lineUserId", userId);
      console.log("LINE ID:", userId);
    }
  } catch (error) {
    console.error("LIFF Initialization failed", error);
  }
}

initializeLiff();

async function scanQRCode() {
  if (!liff.isInClient()) {
    alert("LINEアプリ内で開いてください");
    return;
  }

  try {
    const result = await liff.scanCodeV2(); // QRコードをスキャン
    const qrData = result.value; // QRコードのデータ
    const userId = localStorage.getItem("lineUserId");

    if (!userId) {
      alert("ユーザー情報が取得できません");
      return;
    }

    saveStampToFirestore(userId, qrData);
  } catch (error) {
    console.error("QRコードスキャンエラー", error);
    alert("QRコードスキャンに失敗しました");
  }
}
