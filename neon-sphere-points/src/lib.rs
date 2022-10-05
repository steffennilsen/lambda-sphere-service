use neon::prelude::*;
use rand::rngs::StdRng;
use rand::SeedableRng;
mod sbn;

fn vec_to_array<'a>(
    mut cx: FunctionContext<'a>,
    vec: &Vec<(f32, f32, f32)>,
) -> JsResult<'a, JsArray> {
    let a = JsArray::new(&mut cx, vec.len() as u32);

    for (i, s) in vec.iter().enumerate() {
        let b = JsArray::new(&mut cx, 3 as u32);
        let x = cx.number(s.0);
        let y = cx.number(s.1);
        let z = cx.number(s.2);

        b.set(&mut cx, 0 as u32, x)?;
        b.set(&mut cx, 1 as u32, y)?;
        b.set(&mut cx, 2 as u32, z)?;

        a.set(&mut cx, i as u32, b)?;
    }

    Ok(a)
}

fn points<'a>(mut cx: FunctionContext<'a>) -> JsResult<'a, JsArray> {
    let num_of_points = cx.argument::<JsNumber>(0)?;
    let seed = cx.argument::<JsNumber>(1)?;

    let mut prng = StdRng::seed_from_u64(seed.value(&mut cx) as u64);

    let mut blue_noise_vec: Vec<(f32, f32, f32)> =
        sbn::BlueNoiseSphere::new_with_poles(num_of_points.value(&mut cx) as u32, &mut prng)
            .into_iter()
            .collect();

    blue_noise_vec.sort_by(|a, b| a.1.total_cmp(&b.1));

    Ok(vec_to_array(cx, &blue_noise_vec)?)
}

#[neon::main]
fn main<'a>(mut cx: ModuleContext) -> NeonResult<()> {
    cx.export_function("points", points)?;
    Ok(())
}
