Add-Type -AssemblyName System.Drawing

function Crop-Image {
    param([string]$src, [string]$dest, [int]$x, [int]$y, [int]$w, [int]$h)
    $img = [System.Drawing.Image]::FromFile($src)
    $crop = New-Object System.Drawing.Bitmap($w, $h)
    $g = [System.Drawing.Graphics]::FromImage($crop)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.DrawImage($img, (New-Object System.Drawing.Rectangle(0, 0, $w, $h)), (New-Object System.Drawing.Rectangle($x, $y, $w, $h)), [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()
    $crop.Save($dest, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $crop.Dispose()
    $img.Dispose()
    Write-Output "  -> $dest"
}

$root = "c:\Users\Hugh Mai\New folder\public\products"

# ---- Cua Keo (1360 x 473, 4 horizontal cards + title bar) ----
$src = "$root\image_f1641b.jpg"
$titleH = 30
$cardW = 340
$cardH = 473 - $titleH
$keoNames = @('thep-duc','nhom-duc','hoa-van-co','inox')
Write-Output "Cropping Cua Keo:"
for ($i = 0; $i -lt 4; $i++) {
    Crop-Image $src "$root\cua-keo\$($keoNames[$i]).jpg" ($i * $cardW) $titleH $cardW $cardH
}

# ---- Cua Nhom Kinh (1300 x 470, 4 horizontal cards + title bar) ----
$src = "$root\image_f16453.jpg"
$titleH = 30
$cardW = 325
$cardH = 470 - $titleH
$nhomNames = @('he-cua-di','he-cua-so','he-mat-dung','lan-can-cau-thang')
Write-Output "Cropping Cua Nhom Kinh:"
for ($i = 0; $i -lt 4; $i++) {
    Crop-Image $src "$root\cua-nhom-kinh\$($nhomNames[$i]).jpg" ($i * $cardW) $titleH $cardW $cardH
}

# ---- Cua Cuon (1278 x 840, 4x2 grid + title bar) ----
$src = "$root\image_f16476.jpg"
$titleH = 30
$cardW = 319
$rowH = [int](($840 - $titleH) / 2)
$cuonNames = @(
    'nhom-duc','thep-tinh-dien','tam-lien','song-ngang-mat-vong',
    'inox-sus-304','tole-dai-loan','truot-tran','dong-dac-biet'
)
Write-Output "Cropping Cua Cuon:"
for ($r = 0; $r -lt 2; $r++) {
    for ($c = 0; $c -lt 4; $c++) {
        $idx = $r * 4 + $c
        Crop-Image $src "$root\cua-cuon\$($cuonNames[$idx]).jpg" ($c * $cardW) ($titleH + $r * $rowH) $cardW $rowH
    }
}
Write-Output "Done."
